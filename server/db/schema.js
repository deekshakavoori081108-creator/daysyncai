import { pgTable, serial, text, varchar, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const gameConcepts = pgTable('game_concepts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  tagline: varchar('tagline', { length: 500 }).notNull(),
  civilization: varchar('civilization', { length: 100 }).notNull(),
  gameType: varchar('game_type', { length: 50 }).notNull(),
  targetAge: varchar('target_age', { length: 20 }).notNull(),
  complexity: varchar('complexity', { length: 50 }).default('Intermediate'),
  historicalContext: text('historical_context').notNull(),
  ruleset: jsonb('ruleset').notNull(),
  components: jsonb('components').notNull(),
  layoutConfig: jsonb('layout_config').notNull(),
  fabricationBlueprint: jsonb('fabrication_blueprint'),
  educationalObjectives: jsonb('educational_objectives'),
  archaeologicalCitations: jsonb('archaeological_citations'),
  culturalSensitivityScore: integer('cultural_sensitivity_score').default(98),
  authorName: varchar('author_name', { length: 100 }).default('Student Innovator'),
  isPublic: boolean('is_public').default(false),
  likesCount: integer('likes_count').default(0),
  forkCount: integer('fork_count').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const gameReviews = pgTable('game_reviews', {
  id: serial('id').primaryKey(),
  gameId: integer('game_id').references(() => gameConcepts.id, { onDelete: 'cascade' }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 100 }).default('Educator & Playtester'),
  rating: integer('rating').notNull(),
  feedback: text('feedback').notNull(),
  historicalAccuracyRating: integer('historical_accuracy_rating').default(5),
  funFactorRating: integer('fun_factor_rating').default(5),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
