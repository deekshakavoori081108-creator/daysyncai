import { v4 as uuidv4 } from 'uuid';
import { db, UserRecord, UserPreferencesRecord } from '../db/index';

export class UserRepository {
  async findByEmail(email: string): Promise<UserRecord | null> {
    for (const user of db.users.values()) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  async findById(id: string): Promise<UserRecord | null> {
    return db.users.get(id) || null;
  }

  async create(data: { email: string; password_hash: string; name: string; timezone?: string }): Promise<UserRecord> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id,
      email: data.email.toLowerCase(),
      password_hash: data.password_hash,
      name: data.name,
      timezone: data.timezone || 'Asia/Kolkata',
      created_at: now,
      updated_at: now
    };

    db.users.set(id, newUser);

    // Create default preferences
    const newPrefs: UserPreferencesRecord = {
      id: uuidv4(),
      user_id: id,
      wake_time: '07:00',
      typical_sleep_minutes: 420,
      typical_commute_minutes: 30,
      preferred_departure_buffer_minutes: 15,
      morning_style: 'balanced',
      onboarding_completed: false,
      created_at: now,
      updated_at: now
    };

    db.userPreferences.set(id, newPrefs);
    return newUser;
  }

  async getPreferences(userId: string): Promise<UserPreferencesRecord | null> {
    return db.userPreferences.get(userId) || null;
  }

  async updatePreferences(userId: string, updates: Partial<UserPreferencesRecord>): Promise<UserPreferencesRecord> {
    const existing = db.userPreferences.get(userId);
    const now = new Date().toISOString();

    if (!existing) {
      const newPrefs: UserPreferencesRecord = {
        id: uuidv4(),
        user_id: userId,
        typical_sleep_minutes: 420,
        typical_commute_minutes: 30,
        preferred_departure_buffer_minutes: 15,
        morning_style: 'balanced',
        onboarding_completed: false,
        created_at: now,
        updated_at: now,
        ...updates
      };
      db.userPreferences.set(userId, newPrefs);
      return newPrefs;
    }

    const updated = {
      ...existing,
      ...updates,
      updated_at: now
    };

    db.userPreferences.set(userId, updated);
    return updated;
  }

  async updateProfile(userId: string, updates: { name?: string; timezone?: string }): Promise<UserRecord | null> {
    const user = db.users.get(userId);
    if (!user) return null;

    const updated = {
      ...user,
      ...updates,
      updated_at: new Date().toISOString()
    };

    db.users.set(userId, updated);
    return updated;
  }
}

export const userRepo = new UserRepository();
