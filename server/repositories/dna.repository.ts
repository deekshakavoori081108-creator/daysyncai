import { v4 as uuidv4 } from 'uuid';
import { db, MorningDNARecord } from '../db/index';

export class DNARepository {
  async getByUserId(userId: string): Promise<MorningDNARecord | null> {
    return db.morningDNA.get(userId) || null;
  }

  async upsert(userId: string, data: Partial<MorningDNARecord>): Promise<MorningDNARecord> {
    const existing = db.morningDNA.get(userId);
    const now = new Date().toISOString();

    if (!existing) {
      const newDNA: MorningDNARecord = {
        id: uuidv4(),
        user_id: userId,
        avg_prep_minutes: data.avg_prep_minutes || 15.0,
        avg_wake_delay_minutes: data.avg_wake_delay_minutes || 0.0,
        avg_completion_percentage: data.avg_completion_percentage || 100.0,
        average_departure_buffer_minutes: data.average_departure_buffer_minutes || 15.0,
        normal_mode_percentage: data.normal_mode_percentage || 100.0,
        rush_mode_percentage: data.rush_mode_percentage || 0.0,
        rescue_mode_percentage: data.rescue_mode_percentage || 0.0,
        frequently_skipped_tasks: data.frequently_skipped_tasks || [],
        reliable_tasks: data.reliable_tasks || [],
        behavioral_insights: data.behavioral_insights || [],
        last_calculated_at: now,
        created_at: now,
        updated_at: now
      };
      db.morningDNA.set(userId, newDNA);
      return newDNA;
    }

    const updated = {
      ...existing,
      ...data,
      last_calculated_at: now,
      updated_at: now
    };

    db.morningDNA.set(userId, updated);
    return updated;
  }
}

export const dnaRepo = new DNARepository();
