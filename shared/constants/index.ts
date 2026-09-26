export const TaskCategories = [
  'HYGIENE',
  'HEALTH',
  'FOOD',
  'PREPARATION',
  'WORK',
  'STUDY',
  'COMMUTE',
  'PERSONAL',
  'MINDFULNESS',
  'OTHER'
] as const;

export type TaskCategory = (typeof TaskCategories)[number];

export const TaskPriorities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const;
export type TaskPriority = (typeof TaskPriorities)[number];

export const TaskFlexibilities = ['FIXED', 'FLEXIBLE', 'OPTIONAL'] as const;
export type TaskFlexibility = (typeof TaskFlexibilities)[number];

export const AIBehaviors = ['NEVER_REMOVE', 'COMPRESSIBLE', 'REMOVABLE'] as const;
export type AIBehavior = (typeof AIBehaviors)[number];

export const MorningModes = ['NORMAL', 'RUSH', 'RESCUE'] as const;
export type MorningMode = (typeof MorningModes)[number];

export const TaskStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'] as const;
export type TaskStatus = (typeof TaskStatuses)[number];

export const TrafficLevels = ['LOW', 'MODERATE', 'HIGH', 'SEVERE'] as const;
export type TrafficLevel = (typeof TrafficLevels)[number];

export const CategoryMetadata: Record<
  TaskCategory,
  { label: string; icon: string; color: string; defaultDuration: number }
> = {
  HYGIENE: { label: 'Hygiene & Grooming', icon: 'Sparkles', color: 'blue', defaultDuration: 15 },
  HEALTH: { label: 'Health & Fitness', icon: 'Activity', color: 'emerald', defaultDuration: 20 },
  FOOD: { label: 'Breakfast & Nutrition', icon: 'Utensils', color: 'amber', defaultDuration: 15 },
  PREPARATION: { label: 'Prep & Packing', icon: 'Briefcase', color: 'purple', defaultDuration: 10 },
  WORK: { label: 'Work & Planning', icon: 'Laptop', color: 'indigo', defaultDuration: 15 },
  STUDY: { label: 'Study & Review', icon: 'BookOpen', color: 'cyan', defaultDuration: 20 },
  COMMUTE: { label: 'Commute & Travel', icon: 'Navigation', color: 'rose', defaultDuration: 30 },
  PERSONAL: { label: 'Personal Care', icon: 'Heart', color: 'pink', defaultDuration: 10 },
  MINDFULNESS: { label: 'Mindfulness & Meditation', icon: 'Sun', color: 'teal', defaultDuration: 10 },
  OTHER: { label: 'Other Activities', icon: 'CheckSquare', color: 'slate', defaultDuration: 10 }
};

export const ModeMetadata: Record<
  MorningMode,
  {
    title: string;
    tagline: string;
    description: string;
    bgClass: string;
    borderClass: string;
    textClass: string;
    badgeClass: string;
    accentColor: string;
  }
> = {
  NORMAL: {
    title: 'Normal Mode',
    tagline: 'Balanced & Steady Morning Pace',
    description: 'You have comfortable morning time. All planned routine tasks are preserved with full durations.',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentColor: '#10b981'
  },
  RUSH: {
    title: 'Rush Mode',
    tagline: 'Adaptive Time Compression Active',
    description: 'Available preparation window is reduced. Flexible tasks have been shortened and low-priority items deferred.',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentColor: '#f59e0b'
  },
  RESCUE: {
    title: 'Rescue Mode',
    tagline: 'Emergency Essentials Only',
    description: 'Critical departure window approaching. All optional tasks removed to guarantee on-time arrival.',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/30',
    textClass: 'text-rose-400',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    accentColor: '#f43f5e'
  }
};
