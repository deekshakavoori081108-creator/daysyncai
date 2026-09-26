import { CalendarEvent } from '../../shared/schemas/index';
import { db } from '../db/index';

export interface ICalendarProvider {
  getEventsForDate(userId: string, date: Date): Promise<CalendarEvent[]>;
}

export class DemoCalendarProvider implements ICalendarProvider {
  async getEventsForDate(userId: string, date: Date): Promise<CalendarEvent[]> {
    const events: CalendarEvent[] = [];
    const targetDateStr = date.toISOString().split('T')[0];

    // Query user stored calendar events
    for (const e of db.calendarEvents.values()) {
      if (e.user_id === userId) {
        const eventDateStr = new Date(e.starts_at).toISOString().split('T')[0];
        if (eventDateStr === targetDateStr) {
          events.push({
            id: e.id,
            title: e.title,
            startsAt: e.starts_at,
            endsAt: e.ends_at,
            location: e.location,
            importance: e.importance as any,
            meetingType: e.meeting_type as any,
            prepRequiredMinutes: e.importance === 'CRITICAL' ? 20 : 10
          });
        }
      }
    }

    // If no events exist for today, generate default realistic commitments
    if (events.length === 0) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return [
        {
          id: 'demo-evt-1',
          title: 'Executive Sprint & Roadmap Planning',
          startsAt: new Date(year, month, day, 9, 0, 0).toISOString(),
          endsAt: new Date(year, month, day, 10, 30, 0).toISOString(),
          location: 'Executive Boardroom, Floor 8',
          importance: 'CRITICAL',
          meetingType: 'IN_PERSON',
          prepRequiredMinutes: 20
        },
        {
          id: 'demo-evt-2',
          title: 'AI Morning Engine Architecture Review',
          startsAt: new Date(year, month, day, 11, 45, 0).toISOString(),
          endsAt: new Date(year, month, day, 12, 30, 0).toISOString(),
          location: 'Google Meet',
          importance: 'HIGH',
          meetingType: 'REMOTE',
          prepRequiredMinutes: 10
        }
      ];
    }

    events.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
    return events;
  }
}

export const calendarProvider: ICalendarProvider = new DemoCalendarProvider();
