import { TrafficData } from '../../shared/schemas/index';

export interface ITrafficProvider {
  getTrafficInfo(origin?: string, destination?: string, typicalDurationMinutes?: number): Promise<TrafficData>;
}

export class DemoTrafficProvider implements ITrafficProvider {
  async getTrafficInfo(
    origin: string = 'Home',
    destination: string = 'Cyber City Tech Park',
    typicalDurationMinutes: number = 35
  ): Promise<TrafficData> {
    const currentHour = new Date().getHours();
    const isPeakHour = currentHour >= 8 && currentHour <= 10;

    const trafficLevel = isPeakHour ? 'HIGH' : 'MODERATE';
    const delayMinutes = isPeakHour ? 12 : 5;
    const currentEstimated = typicalDurationMinutes + delayMinutes;

    return {
      origin,
      destination,
      typicalCommuteMinutes: typicalDurationMinutes,
      currentEstimatedMinutes: currentEstimated,
      trafficLevel,
      delayMinutes,
      advisories: [
        isPeakHour
          ? 'Heavy traffic detected on Main Expressway (+12m delay). Recommend departing with extra buffer.'
          : 'Moderate arterial traffic. Commute running within normal buffer parameters.'
      ]
    };
  }
}

export const trafficProvider: ITrafficProvider = new DemoTrafficProvider();
