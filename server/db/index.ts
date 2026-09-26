import { getSeedData } from './seed';

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferencesRecord {
  id: string;
  user_id: string;
  wake_time?: string;
  typical_sleep_minutes: number;
  work_or_study?: string;
  destination?: string;
  typical_commute_minutes: number;
  preferred_departure_buffer_minutes: number;
  morning_style: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoutineTaskRecord {
  id: string;
  user_id: string;
  name: string;
  category: string;
  duration_minutes: number;
  priority: string;
  flexibility: string;
  ai_behavior: string;
  preferred_start_time?: string | null;
  active_days: number[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CalendarEventRecord {
  id: string;
  user_id: string;
  external_id?: string;
  title: string;
  starts_at: string;
  ends_at?: string;
  location?: string | null;
  importance: string;
  meeting_type: string;
  provider: string;
  created_at: string;
}

export interface MorningSessionRecord {
  id: string;
  user_id: string;
  session_date: string;
  planned_wake_time?: string;
  actual_wake_time?: string;
  sleep_minutes?: number;
  mode: string;
  available_minutes?: number;
  completion_percentage: number;
  departure_target?: string;
  departure_status?: string;
  weather_context?: any;
  traffic_context?: any;
  calendar_context?: any;
  ai_summary?: string;
  ai_advisories?: string[];
  created_at: string;
  updated_at: string;
}

export interface MorningTaskRecord {
  id: string;
  session_id: string;
  routine_task_id?: string | null;
  name: string;
  category: string;
  priority: string;
  planned_duration_minutes: number;
  actual_duration_minutes?: number | null;
  planned_start_at?: string;
  planned_end_at?: string;
  actual_start_at?: string | null;
  actual_end_at?: string | null;
  status: string;
  ai_reason?: string;
  sort_order: number;
  created_at: string;
}

export interface BehaviorEventRecord {
  id: string;
  user_id: string;
  session_id?: string;
  task_id?: string;
  event_type: string;
  event_data?: any;
  occurred_at: string;
}

export interface MorningDNARecord {
  id: string;
  user_id: string;
  avg_prep_minutes: number;
  avg_wake_delay_minutes: number;
  avg_completion_percentage: number;
  average_departure_buffer_minutes: number;
  normal_mode_percentage: number;
  rush_mode_percentage: number;
  rescue_mode_percentage: number;
  frequently_skipped_tasks: any[];
  reliable_tasks: any[];
  behavioral_insights: any[];
  last_calculated_at?: string | null;
  created_at: string;
  updated_at: string;
}

class DaySyncDatabase {
  public users = new Map<string, UserRecord>();
  public userPreferences = new Map<string, UserPreferencesRecord>();
  public routineTasks = new Map<string, RoutineTaskRecord>();
  public calendarEvents = new Map<string, CalendarEventRecord>();
  public morningSessions = new Map<string, MorningSessionRecord>();
  public morningTasks = new Map<string, MorningTaskRecord>();
  public behaviorEvents = new Map<string, BehaviorEventRecord>();
  public morningDNA = new Map<string, MorningDNARecord>();

  private initialized = false;

  public async init() {
    if (this.initialized) return;

    try {
      const seed = await getSeedData();

      // Seed user & preferences
      this.users.set(seed.user.id, seed.user);
      this.userPreferences.set(seed.preferences.user_id, seed.preferences);

      // Seed routine tasks
      for (const t of seed.routineTasks) {
        this.routineTasks.set(t.id, {
          ...t,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }

      // Seed calendar events
      for (const e of seed.calendarEvents) {
        this.calendarEvents.set(e.id, {
          ...e,
          created_at: new Date().toISOString()
        });
      }

      // Seed DNA
      this.morningDNA.set(seed.morningDNA.user_id, {
        ...seed.morningDNA,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      // Seed historical sessions
      for (const s of seed.historySessions) {
        this.morningSessions.set(s.id, s);
      }

      this.initialized = true;
      console.log(`[DaySync DB] Ready with demo user (anisha@daysync.ai), ${this.routineTasks.size} tasks, and ${this.morningSessions.size} historical sessions.`);
    } catch (err) {
      console.error('[DaySync DB] Seed initialization failed:', err);
    }
  }
}

export const db = new DaySyncDatabase();
