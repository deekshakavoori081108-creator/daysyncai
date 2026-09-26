import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../auth/password';

export const DEMO_USER_ID = 'e7b1a2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c';

export async function getSeedData() {
  const passwordHash = await hashPassword('password123');

  const user = {
    id: DEMO_USER_ID,
    email: 'anisha@daysync.ai',
    password_hash: passwordHash,
    name: 'Anisha Sharma',
    timezone: 'Asia/Kolkata',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  };

  const preferences = {
    id: uuidv4(),
    user_id: DEMO_USER_ID,
    wake_time: '06:30',
    typical_sleep_minutes: 450, // 7.5 hrs
    work_or_study: 'Product Lead & AI Researcher',
    destination: 'Cyber City Tech Park, Tower 4',
    typical_commute_minutes: 35,
    preferred_departure_buffer_minutes: 15,
    morning_style: 'balanced',
    onboarding_completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const routineTasks = [
    {
      id: 'a1b2c3d4-0001-4000-8000-000000000001',
      user_id: DEMO_USER_ID,
      name: 'Hydrate & Morning Sunlight Breath',
      category: 'MINDFULNESS',
      duration_minutes: 5,
      priority: 'HIGH',
      flexibility: 'FIXED',
      ai_behavior: 'NEVER_REMOVE',
      preferred_start_time: '06:30',
      active_days: [1, 2, 3, 4, 5, 6, 0],
      sort_order: 1,
      is_active: true
    },
    {
      id: 'a1b2c3d4-0002-4000-8000-000000000002',
      user_id: DEMO_USER_ID,
      name: 'Shower & Skincare Routine',
      category: 'HYGIENE',
      duration_minutes: 15,
      priority: 'HIGH',
      flexibility: 'FLEXIBLE',
      ai_behavior: 'COMPRESSIBLE',
      preferred_start_time: '06:35',
      active_days: [1, 2, 3, 4, 5],
      sort_order: 2,
      is_active: true
    },
    {
      id: 'a1b2c3d4-0003-4000-8000-000000000003',
      user_id: DEMO_USER_ID,
      name: 'High-Protein Breakfast & Coffee',
      category: 'FOOD',
      duration_minutes: 20,
      priority: 'MEDIUM',
      flexibility: 'FLEXIBLE',
      ai_behavior: 'COMPRESSIBLE',
      preferred_start_time: '06:50',
      active_days: [1, 2, 3, 4, 5],
      sort_order: 3,
      is_active: true
    },
    {
      id: 'a1b2c3d4-0004-4000-8000-000000000004',
      user_id: DEMO_USER_ID,
      name: 'Core Stretch & Posture Reset',
      category: 'HEALTH',
      duration_minutes: 10,
      priority: 'LOW',
      flexibility: 'OPTIONAL',
      ai_behavior: 'REMOVABLE',
      preferred_start_time: '07:10',
      active_days: [1, 2, 3, 4, 5],
      sort_order: 4,
      is_active: true
    },
    {
      id: 'a1b2c3d4-0005-4000-8000-000000000005',
      user_id: DEMO_USER_ID,
      name: 'Wardrobe & Work Gear Packing',
      category: 'PREPARATION',
      duration_minutes: 15,
      priority: 'CRITICAL',
      flexibility: 'FIXED',
      ai_behavior: 'NEVER_REMOVE',
      preferred_start_time: '07:20',
      active_days: [1, 2, 3, 4, 5],
      sort_order: 5,
      is_active: true
    },
    {
      id: 'a1b2c3d4-0006-4000-8000-000000000006',
      user_id: DEMO_USER_ID,
      name: 'Calendar & Priority Goal Check',
      category: 'WORK',
      duration_minutes: 10,
      priority: 'HIGH',
      flexibility: 'FLEXIBLE',
      ai_behavior: 'COMPRESSIBLE',
      preferred_start_time: '07:35',
      active_days: [1, 2, 3, 4, 5],
      sort_order: 6,
      is_active: true
    }
  ];

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const calendarEvents = [
    {
      id: uuidv4(),
      user_id: DEMO_USER_ID,
      title: 'Executive Sprint & Roadmap Planning',
      starts_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0).toISOString(),
      ends_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30).toISOString(),
      location: 'Executive Boardroom, Floor 8',
      importance: 'CRITICAL',
      meeting_type: 'IN_PERSON',
      provider: 'demo'
    },
    {
      id: uuidv4(),
      user_id: DEMO_USER_ID,
      title: 'AI Morning Engine Architecture Review',
      starts_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 45).toISOString(),
      ends_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30).toISOString(),
      location: 'Google Meet',
      importance: 'HIGH',
      meeting_type: 'REMOTE',
      provider: 'demo'
    },
    {
      id: uuidv4(),
      user_id: DEMO_USER_ID,
      title: 'Design Systems Sync with Mobile Team',
      starts_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0).toISOString(),
      ends_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0).toISOString(),
      location: 'Studio Room B',
      importance: 'MEDIUM',
      meeting_type: 'HYBRID',
      provider: 'demo'
    }
  ];

  const morningDNA = {
    id: uuidv4(),
    user_id: DEMO_USER_ID,
    avg_prep_minutes: 18.5,
    avg_wake_delay_minutes: 6.2,
    avg_completion_percentage: 88.5,
    average_departure_buffer_minutes: 14.0,
    normal_mode_percentage: 64.0,
    rush_mode_percentage: 28.5,
    rescue_mode_percentage: 7.5,
    frequently_skipped_tasks: [
      { taskName: 'Core Stretch & Posture Reset', skipCount: 6, skipRate: 42.8 },
      { taskName: 'High-Protein Breakfast & Coffee', skipCount: 3, skipRate: 21.4 }
    ],
    reliable_tasks: [
      { taskName: 'Hydrate & Morning Sunlight Breath', completionCount: 14, completionRate: 100.0 },
      { taskName: 'Wardrobe & Work Gear Packing', completionCount: 14, completionRate: 100.0 },
      { taskName: 'Shower & Skincare Routine', completionCount: 13, completionRate: 92.8 }
    ],
    behavioral_insights: [
      {
        title: 'Preparation Time Drift Detected',
        description: 'You typically spend 18-20 minutes getting dressed and packing, even when scheduled for 15 minutes.',
        evidence: 'Across the past 14 morning sessions, average preparation task duration is 18.5 minutes (+3.5 min variance).',
        confidence: 'HIGH',
        category: 'ROUTINE_TIMING'
      },
      {
        title: 'Morning Mode Breakfast Sensitivity',
        description: 'Breakfast is skipped in 75% of Rush Mode sessions, leading to energy slumps before 11:00 AM meetings.',
        evidence: '3 out of 4 Rush Mode sessions recorded a skipped breakfast task due to tight departure windows.',
        confidence: 'HIGH',
        category: 'HABIT_PATTERN'
      },
      {
        title: 'Superior Routine Stability On Time',
        description: 'When waking up within 5 minutes of your 06:30 target, your routine completion rate reaches 96%.',
        evidence: '9 Normal Mode sessions achieved an average task completion rate of 96.2%.',
        confidence: 'HIGH',
        category: 'COMPLETION_RATE'
      }
    ],
    last_calculated_at: new Date().toISOString()
  };

  // 14 days of realistic history sessions
  const historySessions = [];
  for (let i = 1; i <= 14; i++) {
    const sessionDate = new Date(Date.now() - i * 86400000);
    const dateStr = sessionDate.toISOString().split('T')[0];
    const isRush = i === 3 || i === 7 || i === 11;
    const isRescue = i === 9;
    const mode = isRescue ? 'RESCUE' : isRush ? 'RUSH' : 'NORMAL';
    const completion = isRescue ? 60.0 : isRush ? 80.0 : 95.0;

    historySessions.push({
      id: uuidv4(),
      user_id: DEMO_USER_ID,
      session_date: dateStr,
      planned_wake_time: new Date(sessionDate.setHours(6, 30, 0, 0)).toISOString(),
      actual_wake_time: new Date(sessionDate.setHours(isRescue ? 7 : isRush ? 6 : 6, isRescue ? 10 : isRush ? 48 : 32, 0, 0)).toISOString(),
      sleep_minutes: isRescue ? 390 : isRush ? 420 : 460,
      mode,
      available_minutes: isRescue ? 35 : isRush ? 55 : 75,
      completion_percentage: completion,
      departure_target: new Date(sessionDate.setHours(7, 45, 0, 0)).toISOString(),
      departure_status: isRescue ? 'ON_TIME_RESCUED' : isRush ? 'ON_TIME_RUSHED' : 'ON_TIME_COMFORTABLE',
      ai_summary: isRescue
        ? 'Late wake-up triggered Rescue Mode. Only critical hygiene and wardrobe tasks were executed.'
        : isRush
        ? 'Minor delay entered Rush Mode. Breakfast compressed to 10 minutes.'
        : 'Smooth Normal Mode execution with all wellness and planning tasks completed.',
      created_at: new Date(sessionDate).toISOString(),
      updated_at: new Date(sessionDate).toISOString()
    });
  }

  return {
    user,
    preferences,
    routineTasks,
    calendarEvents,
    morningDNA,
    historySessions
  };
}
