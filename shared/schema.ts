import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Destinations schema
export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  country: text("country").notNull(),
  continent: text("continent").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: real("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  priceFrom: integer("price_from").notNull(),
  featured: boolean("featured").notNull().default(false),
  trending: boolean("trending").notNull().default(false),
  popular: boolean("popular").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({ id: true });
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

// Tours schema
export const tours = pgTable("tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  destinationId: varchar("destination_id").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  rating: real("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  maxGroupSize: integer("max_group_size").notNull().default(12),
  spotsLeft: integer("spots_left").notNull().default(8),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  galleryImages: text("gallery_images").array().notNull().default(sql`ARRAY[]::text[]`),
  inclusions: text("inclusions").array().notNull().default(sql`ARRAY[]::text[]`),
  exclusions: text("exclusions").array().notNull().default(sql`ARRAY[]::text[]`),
  highlights: text("highlights").array().notNull().default(sql`ARRAY[]::text[]`),
  featured: boolean("featured").notNull().default(false),
});

export const insertTourSchema = createInsertSchema(tours).omit({ id: true });
export type InsertTour = z.infer<typeof insertTourSchema>;
export type Tour = typeof tours.$inferSelect;

// Tour Itinerary schema
export const tourItinerary = pgTable("tour_itinerary", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tourId: varchar("tour_id").notNull(),
  day: integer("day").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  activities: text("activities").array().notNull().default(sql`ARRAY[]::text[]`),
});

export const insertItinerarySchema = createInsertSchema(tourItinerary).omit({ id: true });
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type TourItinerary = typeof tourItinerary.$inferSelect;

// Tour Guides schema
export const tourGuides = pgTable("tour_guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  languages: text("languages").array().notNull().default(sql`ARRAY[]::text[]`),
  experience: integer("experience").notNull(),
  rating: real("rating").notNull().default(4.8),
});

export const insertGuideSchema = createInsertSchema(tourGuides).omit({ id: true });
export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type TourGuide = typeof tourGuides.$inferSelect;

// Inquiries schema
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  tourId: varchar("tour_id"),
  destinationId: varchar("destination_id"),
  travelDate: text("travel_date"),
  travelers: integer("travelers").notNull().default(2),
  message: text("message"),
  contactPreference: text("contact_preference").notNull().default("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

// Testimonials schema
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  tourId: varchar("tour_id"),
  destinationName: text("destination_name"),
  featured: boolean("featured").notNull().default(false),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Blog Posts schema
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  authorImage: text("author_image"),
  readTime: integer("read_time").notNull().default(5),
  publishedAt: timestamp("published_at").defaultNow(),
  featured: boolean("featured").notNull().default(false),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, publishedAt: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Newsletter Subscribers schema
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, subscribedAt: true });
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Team Members schema
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  linkedIn: text("linkedin"),
  twitter: text("twitter"),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

// FAQ schema
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("general"),
  tourId: varchar("tour_id"),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;

// Users table (kept for compatibility)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tour categories type
export type TourCategory = 
  | "adventure" 
  | "luxury" 
  | "family" 
  | "honeymoon" 
  | "solo" 
  | "cultural" 
  | "wildlife" 
  | "beach";

// Continent type
export type Continent = 
  | "asia" 
  | "europe" 
  | "africa" 
  | "north-america" 
  | "south-america" 
  | "oceania" 
  | "antarctica";
