import { v4 as uuidv4 } from 'uuid';
import { db, MorningSessionRecord, MorningTaskRecord, BehaviorEventRecord } from '../db/index';

export class MorningRepository {
  async getTodaySession(userId: string, dateStr: string): Promise<{ session: MorningSessionRecord; tasks: MorningTaskRecord[] } | null> {
    for (const session of db.morningSessions.values()) {
      if (session.user_id === userId && session.session_date === dateStr) {
        const tasks = await this.getSessionTasks(session.id);
        return { session, tasks };
      }
    }
    return null;
  }

  async getSessionTasks(sessionId: string): Promise<MorningTaskRecord[]> {
    const tasks: MorningTaskRecord[] = [];
    for (const t of db.morningTasks.values()) {
      if (t.session_id === sessionId) {
        tasks.push(t);
      }
    }
    return tasks.sort((a, b) => a.sort_order - b.sort_order);
  }

  async createSession(userId: string, data: Omit<MorningSessionRecord, 'id' | 'created_at' | 'updated_at'>): Promise<MorningSessionRecord> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const newSession: MorningSessionRecord = {
      id,
      ...data,
      created_at: now,
      updated_at: now
    };
    db.morningSessions.set(id, newSession);
    return newSession;
  }

  async updateSession(sessionId: string, updates: Partial<MorningSessionRecord>): Promise<MorningSessionRecord | null> {
    const session = db.morningSessions.get(sessionId);
    if (!session) return null;

    const updated = {
      ...session,
      ...updates,
      updated_at: new Date().toISOString()
    };
    db.morningSessions.set(sessionId, updated);
    return updated;
  }

  async replaceSessionTasks(sessionId: string, tasks: Array<Omit<MorningTaskRecord, 'id' | 'session_id' | 'created_at'>>): Promise<MorningTaskRecord[]> {
    // Remove existing tasks for this session
    for (const [id, t] of Array.from(db.morningTasks.entries())) {
      if (t.session_id === sessionId) {
        db.morningTasks.delete(id);
      }
    }

    const createdTasks: MorningTaskRecord[] = [];
    const now = new Date().toISOString();

    for (const t of tasks) {
      const id = uuidv4();
      const record: MorningTaskRecord = {
        id,
        session_id: sessionId,
        ...t,
        created_at: now
      };
      db.morningTasks.set(id, record);
      createdTasks.push(record);
    }

    return createdTasks;
  }

  async updateTaskStatus(
    taskId: string,
    userId: string,
    updates: {
      status: string;
      actual_duration_minutes?: number | null;
      actual_start_at?: string | null;
      actual_end_at?: string | null;
    }
  ): Promise<MorningTaskRecord | null> {
    const task = db.morningTasks.get(taskId);
    if (!task) return null;

    // Verify session belongs to user
    const session = db.morningSessions.get(task.session_id);
    if (!session || session.user_id !== userId) return null;

    const updated = {
      ...task,
      ...updates
    };
    db.morningTasks.set(taskId, updated);

    // Recalculate session completion percentage
    const allTasks = await this.getSessionTasks(session.id);
    const completedCount = allTasks.filter(t => t.status === 'COMPLETED').length;
    const totalCount = allTasks.length;
    const completionPercentage = totalCount > 0 ? Number(((completedCount / totalCount) * 100).toFixed(1)) : 0;

    await this.updateSession(session.id, { completion_percentage: completionPercentage });

    return updated;
  }

  async logBehaviorEvent(userId: string, event: Omit<BehaviorEventRecord, 'id' | 'occurred_at'>): Promise<BehaviorEventRecord> {
    const id = uuidv4();
    const record: BehaviorEventRecord = {
      id,
      ...event,
      occurred_at: new Date().toISOString()
    };
    db.behaviorEvents.set(id, record);
    return record;
  }

  async getHistory(userId: string, limit: number = 30, offset: number = 0): Promise<{ sessions: MorningSessionRecord[]; total: number }> {
    const list: MorningSessionRecord[] = [];
    for (const s of db.morningSessions.values()) {
      if (s.user_id === userId) {
        list.push(s);
      }
    }

    list.sort((a, b) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime());
    const total = list.length;
    const paginated = list.slice(offset, offset + limit);

    return { sessions: paginated, total };
  }

  async getSessionByDate(userId: string, dateStr: string): Promise<{ session: MorningSessionRecord; tasks: MorningTaskRecord[] } | null> {
    for (const s of db.morningSessions.values()) {
      if (s.user_id === userId && s.session_date === dateStr) {
        const tasks = await this.getSessionTasks(s.id);
        return { session: s, tasks };
      }
    }
    return null;
  }

  async getBehaviorEvents(userId: string, limit: number = 100): Promise<BehaviorEventRecord[]> {
    const events: BehaviorEventRecord[] = [];
    for (const e of db.behaviorEvents.values()) {
      if (e.user_id === userId) {
        events.push(e);
      }
    }
    events.sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());
    return events.slice(0, limit);
  }
}

export const morningRepo = new MorningRepository();
