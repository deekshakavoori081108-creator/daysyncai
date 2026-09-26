import { v4 as uuidv4 } from 'uuid';
import { db, RoutineTaskRecord } from '../db/index';

export class RoutineRepository {
  async getTasksByUserId(userId: string): Promise<RoutineTaskRecord[]> {
    const tasks: RoutineTaskRecord[] = [];
    for (const task of db.routineTasks.values()) {
      if (task.user_id === userId) {
        tasks.push(task);
      }
    }
    return tasks.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }

  async getTaskById(taskId: string, userId: string): Promise<RoutineTaskRecord | null> {
    const task = db.routineTasks.get(taskId);
    if (!task || task.user_id !== userId) return null;
    return task;
  }

  async createTask(userId: string, data: Omit<RoutineTaskRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<RoutineTaskRecord> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const existing = await this.getTasksByUserId(userId);
    const maxSort = existing.reduce((max, t) => Math.max(max, t.sort_order || 0), 0);

    const newTask: RoutineTaskRecord = {
      id,
      user_id: userId,
      name: data.name,
      category: data.category,
      duration_minutes: data.duration_minutes,
      priority: data.priority || 'MEDIUM',
      flexibility: data.flexibility || 'FLEXIBLE',
      ai_behavior: data.ai_behavior || 'COMPRESSIBLE',
      preferred_start_time: data.preferred_start_time || null,
      active_days: data.active_days || [1, 2, 3, 4, 5],
      sort_order: data.sort_order !== undefined ? data.sort_order : maxSort + 1,
      is_active: data.is_active !== undefined ? data.is_active : true,
      created_at: now,
      updated_at: now
    };

    db.routineTasks.set(id, newTask);
    return newTask;
  }

  async updateTask(taskId: string, userId: string, updates: Partial<RoutineTaskRecord>): Promise<RoutineTaskRecord | null> {
    const task = await this.getTaskById(taskId, userId);
    if (!task) return null;

    const updated = {
      ...task,
      ...updates,
      updated_at: new Date().toISOString()
    };

    db.routineTasks.set(taskId, updated);
    return updated;
  }

  async deleteTask(taskId: string, userId: string): Promise<boolean> {
    const task = await this.getTaskById(taskId, userId);
    if (!task) return false;

    db.routineTasks.delete(taskId);
    return true;
  }

  async reorderTasks(userId: string, taskIds: string[]): Promise<RoutineTaskRecord[]> {
    const updatedTasks: RoutineTaskRecord[] = [];
    taskIds.forEach((id, index) => {
      const task = db.routineTasks.get(id);
      if (task && task.user_id === userId) {
        task.sort_order = index + 1;
        task.updated_at = new Date().toISOString();
        db.routineTasks.set(id, task);
        updatedTasks.push(task);
      }
    });
    return updatedTasks;
  }
}

export const routineRepo = new RoutineRepository();
