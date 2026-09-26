import { userRepo } from '../repositories/user.repository';
import { routineRepo } from '../repositories/routine.repository';
import { morningRepo } from '../repositories/morning.repository';
import { dnaRepo } from '../repositories/dna.repository';
import { weatherProvider } from '../providers/weather.provider';
import { calendarProvider } from '../providers/calendar.provider';
import { trafficProvider } from '../providers/traffic.provider';
import { geminiService } from './gemini.service';
import { MorningPlan } from '../../shared/schemas/index';
import { MorningMode } from '../../shared/constants/index';

export class MorningEngineService {
  async getOrGenerateTodayPlan(
    userId: string,
    options: {
      forceRecalculate?: boolean;
      customWakeTime?: string;
      forceMode?: MorningMode;
      sleepMinutes?: number;
    } = {}
  ): Promise<{
    session: any;
    tasks: any[];
    plan: MorningPlan;
    weather: any;
    traffic: any;
    calendar: any[];
    dna: any;
  }> {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    // If not forcing recalculate, check if today's session already exists
    if (!options.forceRecalculate) {
      const existing = await morningRepo.getTodaySession(userId, dateStr);
      if (existing) {
        const weather = await weatherProvider.getWeather();
        const traffic = await trafficProvider.getTrafficInfo();
        const calendar = await calendarProvider.getEventsForDate(userId, today);
        const dna = await dnaRepo.getByUserId(userId);

        const plan: MorningPlan = {
          summary: existing.session.ai_summary || 'Your personalized morning timeline.',
          mode: existing.session.mode as any,
          availableMinutes: existing.session.available_minutes || 60,
          tasks: existing.tasks.map(t => ({
            sourceTaskId: t.routine_task_id || null,
            name: t.name,
            category: t.category as any,
            priority: t.priority as any,
            durationMinutes: t.planned_duration_minutes,
            action: 'KEEP',
            reason: t.ai_reason || 'Scheduled routine component.',
            order: t.sort_order,
            plannedStartAt: t.planned_start_at,
            plannedEndAt: t.planned_end_at
          })),
          departure: {
            recommended: true,
            time: existing.session.departure_target || new Date(today.setHours(8, 0, 0, 0)).toISOString(),
            reason: 'Calculated target departure for today.',
            bufferMinutes: 15
          },
          removedTasks: [],
          advisories: existing.session.ai_advisories || []
        };

        return {
          session: existing.session,
          tasks: existing.tasks,
          plan,
          weather,
          traffic,
          calendar,
          dna
        };
      }
    }

    // Generate fresh plan
    const user = await userRepo.findById(userId);
    const preferences = await userRepo.getPreferences(userId);
    const routineTasks = (await routineRepo.getTasksByUserId(userId)).filter(t => t.is_active);
    const weather = await weatherProvider.getWeather(preferences?.destination);
    const calendar = await calendarProvider.getEventsForDate(userId, today);
    const traffic = await trafficProvider.getTrafficInfo(
      'Home',
      preferences?.destination || 'Workplace',
      preferences?.typical_commute_minutes || 30
    );
    const dna = await dnaRepo.getByUserId(userId);

    // Timing calculations
    const now = new Date();
    let actualWakeTime = now;
    if (options.customWakeTime) {
      const [h, m] = options.customWakeTime.split(':').map(Number);
      actualWakeTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m, 0);
    } else if (preferences?.wake_time) {
      const [h, m] = preferences.wake_time.split(':').map(Number);
      actualWakeTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m, 0);
    }

    // Determine first calendar commitment & departure target
    let firstCommitmentTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0);
    if (calendar.length > 0 && calendar[0].startsAt) {
      firstCommitmentTime = new Date(calendar[0].startsAt);
    }

    const commuteDuration = traffic.currentEstimatedMinutes || preferences?.typical_commute_minutes || 30;
    const bufferMinutes = preferences?.preferred_departure_buffer_minutes || 15;
    const weatherBuffer = weather.rainProbability > 50 ? 5 : 0;
    const totalTransitBuffer = commuteDuration + bufferMinutes + weatherBuffer;

    const departureTargetTime = new Date(firstCommitmentTime.getTime() - totalTransitBuffer * 60000);

    // Available morning minutes
    const availableMs = departureTargetTime.getTime() - actualWakeTime.getTime();
    let availableMinutes = Math.max(15, Math.floor(availableMs / 60000));

    // Calculate total scheduled routine duration
    const totalScheduled = routineTasks.reduce((sum, t) => sum + t.duration_minutes, 0);
    const criticalDuration = routineTasks
      .filter(t => t.priority === 'CRITICAL' || t.ai_behavior === 'NEVER_REMOVE')
      .reduce((sum, t) => sum + t.duration_minutes, 0);

    // Deterministic Mode Calculation
    let calculatedMode: MorningMode = 'NORMAL';
    if (options.forceMode) {
      calculatedMode = options.forceMode;
    } else if (availableMinutes < criticalDuration + 10) {
      calculatedMode = 'RESCUE';
    } else if (availableMinutes < totalScheduled) {
      calculatedMode = 'RUSH';
    } else {
      calculatedMode = 'NORMAL';
    }

    // Call Gemini AI for optimization and personalization
    const optimizedPlan = await geminiService.optimizeMorningPlan({
      user,
      preferences,
      routineTasks,
      calendar,
      weather,
      traffic,
      morningDNA: dna,
      currentTime: actualWakeTime.toISOString(),
      availableMinutes,
      mode: calculatedMode,
      departureTargetTime: departureTargetTime.toISOString()
    });

    // Sequence tasks with timestamps
    let cursor = new Date(actualWakeTime.getTime());
    const sequencedTasks = optimizedPlan.tasks.map((task, idx) => {
      const startAt = new Date(cursor.getTime());
      const endAt = new Date(cursor.getTime() + task.durationMinutes * 60000);
      cursor = endAt;

      return {
        routine_task_id: task.sourceTaskId,
        name: task.name,
        category: task.category,
        priority: task.priority,
        planned_duration_minutes: task.durationMinutes,
        actual_duration_minutes: null,
        planned_start_at: startAt.toISOString(),
        planned_end_at: endAt.toISOString(),
        status: 'PENDING',
        ai_reason: task.reason,
        sort_order: idx + 1
      };
    });

    // Save or update session in database
    let session = (await morningRepo.getTodaySession(userId, dateStr))?.session;
    if (session) {
      session = await morningRepo.updateSession(session.id, {
        mode: calculatedMode,
        available_minutes: availableMinutes,
        departure_target: departureTargetTime.toISOString(),
        weather_context: weather,
        traffic_context: traffic,
        calendar_context: calendar,
        ai_summary: optimizedPlan.summary,
        ai_advisories: optimizedPlan.advisories
      }) as any;
    } else {
      session = await morningRepo.createSession(userId, {
        user_id: userId,
        session_date: dateStr,
        planned_wake_time: preferences?.wake_time ? new Date(today.setHours(Number(preferences.wake_time.split(':')[0]), Number(preferences.wake_time.split(':')[1]))).toISOString() : actualWakeTime.toISOString(),
        actual_wake_time: actualWakeTime.toISOString(),
        sleep_minutes: options.sleepMinutes || preferences?.typical_sleep_minutes || 420,
        mode: calculatedMode,
        available_minutes: availableMinutes,
        completion_percentage: 0,
        departure_target: departureTargetTime.toISOString(),
        departure_status: 'PENDING',
        weather_context: weather,
        traffic_context: traffic,
        calendar_context: calendar,
        ai_summary: optimizedPlan.summary,
        ai_advisories: optimizedPlan.advisories
      });
    }

    const savedTasks = await morningRepo.replaceSessionTasks(session.id, sequencedTasks);

    // Log calculation event
    await morningRepo.logBehaviorEvent(userId, {
      user_id: userId,
      session_id: session.id,
      event_type: 'SESSION_RECALCULATED',
      event_data: { mode: calculatedMode, availableMinutes, taskCount: savedTasks.length }
    });

    return {
      session,
      tasks: savedTasks,
      plan: optimizedPlan,
      weather,
      traffic,
      calendar,
      dna
    };
  }
}

export const morningEngine = new MorningEngineService();
