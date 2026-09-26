import { dnaRepo } from '../repositories/dna.repository';
import { morningRepo } from '../repositories/morning.repository';
import { geminiService } from './gemini.service';
import { db } from '../db/index';

export class DNAEngineService {
  async recalculateUserDNA(userId: string) {
    const history = await morningRepo.getHistory(userId, 30);
    const sessions = history.sessions;
    const events = await morningRepo.getBehaviorEvents(userId, 200);

    if (sessions.length === 0) {
      return dnaRepo.getByUserId(userId);
    }

    // 1. Calculate Mode Distribution
    const normalCount = sessions.filter(s => s.mode === 'NORMAL').length;
    const rushCount = sessions.filter(s => s.mode === 'RUSH').length;
    const rescueCount = sessions.filter(s => s.mode === 'RESCUE').length;
    const totalSessions = sessions.length;

    const normalModePercentage = Number(((normalCount / totalSessions) * 100).toFixed(1));
    const rushModePercentage = Number(((rushCount / totalSessions) * 100).toFixed(1));
    const rescueModePercentage = Number(((rescueCount / totalSessions) * 100).toFixed(1));

    // 2. Average Completion Percentage
    const avgCompletion = Number(
      (sessions.reduce((acc, s) => acc + (s.completion_percentage || 0), 0) / totalSessions).toFixed(1)
    );

    // 3. Task Reliability & Skip Frequencies
    const taskStats = new Map<string, { completed: number; skipped: number; totalDuration: number; durationSamples: number }>();

    for (const t of db.morningTasks.values()) {
      const session = db.morningSessions.get(t.session_id);
      if (session && session.user_id === userId) {
        const stats = taskStats.get(t.name) || { completed: 0, skipped: 0, totalDuration: 0, durationSamples: 0 };
        if (t.status === 'COMPLETED') {
          stats.completed++;
          if (t.actual_duration_minutes) {
            stats.totalDuration += t.actual_duration_minutes;
            stats.durationSamples++;
          }
        } else if (t.status === 'SKIPPED') {
          stats.skipped++;
        }
        taskStats.set(t.name, stats);
      }
    }

    const frequentlySkipped: any[] = [];
    const reliableTasks: any[] = [];

    taskStats.forEach((stats, name) => {
      const totalOccurrences = stats.completed + stats.skipped;
      if (totalOccurrences >= 2) {
        const skipRate = Number(((stats.skipped / totalOccurrences) * 100).toFixed(1));
        const completionRate = Number(((stats.completed / totalOccurrences) * 100).toFixed(1));

        if (skipRate >= 20) {
          frequentlySkipped.push({ taskName: name, skipCount: stats.skipped, skipRate });
        }
        if (completionRate >= 80) {
          reliableTasks.push({ taskName: name, completionCount: stats.completed, completionRate });
        }
      }
    });

    frequentlySkipped.sort((a, b) => b.skipRate - a.skipRate);
    reliableTasks.sort((a, b) => b.completionRate - a.completionRate);

    // 4. Prep duration deviation calculation
    let avgPrepMinutes = 18.5;
    const prepTask = taskStats.get('Wardrobe & Work Gear Packing') || taskStats.get('Preparation & Packing');
    if (prepTask && prepTask.durationSamples > 0) {
      avgPrepMinutes = Number((prepTask.totalDuration / prepTask.durationSamples).toFixed(1));
    }

    // 5. Generate AI Behavioral Insights
    const insights = await geminiService.generateDNAInsights({
      statistics: {
        totalSessions,
        normalModePercentage,
        rushModePercentage,
        rescueModePercentage,
        avgCompletion,
        avgPrepMinutes
      },
      recentSessions: sessions.slice(0, 7),
      taskPatterns: { frequentlySkipped, reliableTasks },
      existingInsights: []
    });

    // 6. Update Morning DNA in DB
    const updated = await dnaRepo.upsert(userId, {
      avg_prep_minutes: avgPrepMinutes,
      avg_wake_delay_minutes: 5.5,
      avg_completion_percentage: avgCompletion,
      average_departure_buffer_minutes: 14.0,
      normal_mode_percentage: normalModePercentage,
      rush_mode_percentage: rushModePercentage,
      rescue_mode_percentage: rescueModePercentage,
      frequently_skipped_tasks: frequentlySkipped,
      reliable_tasks: reliableTasks,
      behavioral_insights: insights
    });

    return updated;
  }
}

export const dnaEngine = new DNAEngineService();
