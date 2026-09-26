import { z } from 'zod';
import {
  TaskCategories,
  TaskPriorities,
  TaskFlexibilities,
  AIBehaviors,
  MorningModes,
  TaskStatuses,
  TrafficLevels
} from '../constants/index';

// Authentication Schemas
export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  timezone: z.string().default('Asia/Kolkata')
});

export type SignupInput = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

export type LoginInput = z.infer<typeof LoginSchema>;

// Profile & Preferences Schemas
export const ProfileSchema = z.object({
  name: z.string().min(2).max(60),
  wakeTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)').optional(),
  typicalSleepMinutes: z.number().int().min(120).max(720).optional(),
  workOrStudy: z.string().max(100).optional(),
  destination: z.string().max(150).optional(),
  typicalCommuteMinutes: z.number().int().min(0).max(240).optional(),
  preferredDepartureBufferMinutes: z.number().int().min(0).max(60).default(15),
  morningStyle: z.enum(['calm', 'balanced', 'energetic', 'minimal']).default('balanced')
});

export type ProfileInput = z.infer<typeof ProfileSchema>;

// Onboarding Schema
export const OnboardingSchema = z.object({
  name: z.string().min(2),
  wakeTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  typicalSleepMinutes: z.number().int().min(180).max(720).default(420),
  workOrStudy: z.string().min(2),
  destination: z.string().min(2),
  typicalCommuteMinutes: z.number().int().min(0).max(180).default(30),
  preferredDepartureBufferMinutes: z.number().int().min(0).max(60).default(15),
  morningStyle: z.enum(['calm', 'balanced', 'energetic', 'minimal']).default('balanced'),
  initialTasks: z.array(
    z.object({
      name: z.string().min(2),
      category: z.enum(TaskCategories),
      durationMinutes: z.number().int().min(1).max(120),
      priority: z.enum(TaskPriorities),
      flexibility: z.enum(TaskFlexibilities),
      aiBehavior: z.enum(AIBehaviors),
      preferredStartTime: z.string().optional(),
      activeDays: z.array(z.number().int().min(0).max(6)).default([1, 2, 3, 4, 5]),
      isActive: z.boolean().default(true)
    })
  ).min(1, 'Please select or add at least one morning task')
});

export type OnboardingInput = z.infer<typeof OnboardingSchema>;

// Routine Task Schemas
export const RoutineTaskSchema = z.object({
  name: z.string().min(2, 'Task name must be at least 2 characters').max(100),
  category: z.enum(TaskCategories),
  durationMinutes: z.number().int().min(1).max(180),
  priority: z.enum(TaskPriorities).default('MEDIUM'),
  flexibility: z.enum(TaskFlexibilities).default('FLEXIBLE'),
  aiBehavior: z.enum(AIBehaviors).default('COMPRESSIBLE'),
  preferredStartTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).nullable().optional(),
  activeDays: z.array(z.number().int().min(0).max(6)).default([1, 2, 3, 4, 5]),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true)
});

export type RoutineTaskInput = z.infer<typeof RoutineTaskSchema>;

export const RoutineTaskUpdateSchema = RoutineTaskSchema.partial();
export type RoutineTaskUpdateInput = z.infer<typeof RoutineTaskUpdateSchema>;

// Context Schemas
export const WeatherSchema = z.object({
  temperature: z.number(),
  feelsLike: z.number(),
  condition: z.string(),
  icon: z.string().optional(),
  rainProbability: z.number().min(0).max(100),
  windSpeedKmH: z.number().optional(),
  severity: z.enum(['NORMAL', 'NOTICE', 'MODERATE', 'SEVERE']).default('NORMAL'),
  recommendations: z.array(z.string())
});

export type WeatherData = z.infer<typeof WeatherSchema>;

export const TrafficSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  typicalCommuteMinutes: z.number(),
  currentEstimatedMinutes: z.number(),
  trafficLevel: z.enum(TrafficLevels),
  delayMinutes: z.number().default(0),
  recommendedDepartureTime: z.string().optional(),
  advisories: z.array(z.string()).default([])
});

export type TrafficData = z.infer<typeof TrafficSchema>;

export const CalendarEventSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  startsAt: z.string(), // ISO string
  endsAt: z.string().optional(),
  location: z.string().nullable().optional(),
  importance: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
  meetingType: z.enum(['IN_PERSON', 'REMOTE', 'HYBRID', 'PERSONAL']).default('IN_PERSON'),
  prepRequiredMinutes: z.number().default(0)
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

// Morning Plan Generation & AI Output Schemas
export const MorningGenerateSchema = z.object({
  customWakeTime: z.string().optional(),
  forceMode: z.enum(MorningModes).optional(),
  sleepMinutes: z.number().optional(),
  notes: z.string().optional()
});

export type MorningGenerateInput = z.infer<typeof MorningGenerateSchema>;

export const MorningPlanItemSchema = z.object({
  sourceTaskId: z.string().nullable().optional(),
  name: z.string(),
  category: z.enum(TaskCategories),
  priority: z.enum(TaskPriorities),
  durationMinutes: z.number().int().positive(),
  action: z.enum(['KEEP', 'COMPRESS', 'REMOVE']),
  reason: z.string(),
  order: z.number().int(),
  plannedStartAt: z.string().optional(),
  plannedEndAt: z.string().optional()
});

export type MorningPlanItem = z.infer<typeof MorningPlanItemSchema>;

export const MorningPlanSchema = z.object({
  summary: z.string(),
  mode: z.enum(MorningModes),
  availableMinutes: z.number().int().positive(),
  tasks: z.array(MorningPlanItemSchema),
  departure: z.object({
    recommended: z.boolean(),
    time: z.string(),
    reason: z.string(),
    bufferMinutes: z.number().default(15)
  }),
  removedTasks: z.array(
    z.object({
      name: z.string(),
      reason: z.string()
    })
  ).default([]),
  advisories: z.array(z.string()).default([]),
  aiHeadline: z.string().optional()
});

export type MorningPlan = z.infer<typeof MorningPlanSchema>;

// Behavior Event Schema
export const BehaviorEventSchema = z.object({
  sessionId: z.string().uuid().optional(),
  taskId: z.string().uuid().optional(),
  eventType: z.enum([
    'TASK_STARTED',
    'TASK_COMPLETED',
    'TASK_SKIPPED',
    'TASK_DELAYED',
    'TASK_RESET',
    'SESSION_RECALCULATED',
    'DEPARTURE_RECORDED',
    'MODE_TRANSITIONED'
  ]),
  eventData: z.record(z.any()).optional()
});

export type BehaviorEventInput = z.infer<typeof BehaviorEventSchema>;

// Morning DNA & Insight Schemas
export const AIInsightSchema = z.object({
  title: z.string(),
  description: z.string(),
  evidence: z.string(),
  confidence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  category: z.enum(['ROUTINE_TIMING', 'COMPLETION_RATE', 'HABIT_PATTERN', 'DEPARTURE_SUCCESS', 'WELLNESS']).default('ROUTINE_TIMING')
});

export type AIInsight = z.infer<typeof AIInsightSchema>;

export const MorningDNASchema = z.object({
  avgPrepMinutes: z.number(),
  avgWakeDelayMinutes: z.number(),
  avgCompletionPercentage: z.number(),
  averageDepartureBufferMinutes: z.number(),
  normalModePercentage: z.number(),
  rushModePercentage: z.number(),
  rescueModePercentage: z.number(),
  frequentlySkippedTasks: z.array(
    z.object({
      taskName: z.string(),
      skipCount: z.number(),
      skipRate: z.number()
    })
  ).default([]),
  reliableTasks: z.array(
    z.object({
      taskName: z.string(),
      completionCount: z.number(),
      completionRate: z.number()
    })
  ).default([]),
  behavioralInsights: z.array(AIInsightSchema).default([]),
  lastCalculatedAt: z.string().nullable().optional()
});

export type MorningDNAData = z.infer<typeof MorningDNASchema>;
