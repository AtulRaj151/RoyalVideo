import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true
});

export const photographers = pgTable("photographers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  image: text("image"),
  instagram: text("instagram"),
  facebook: text("facebook"),
  website: text("website"),
});

export const insertPhotographerSchema = createInsertSchema(photographers).pick({
  name: true,
  title: true,
  bio: true,
  image: true,
  instagram: true,
  facebook: true,
  website: true,
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  image: text("image"),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  name: true,
  description: true,
  icon: true,
  image: true,
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  description: text("description").notNull(),
  isPopular: boolean("is_popular").default(false),
  features: text("features").array()
});

export const insertPackageSchema = createInsertSchema(packages).pick({
  name: true,
  price: true,
  description: true,
  isPopular: true,
  features: true,
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  event: text("event").notNull(),
  date: text("date").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  image: text("image"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  event: true,
  date: true,
  content: true,
  rating: true,
  image: true,
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  packageId: integer("package_id").notNull(),
  eventDate: timestamp("event_date").notNull(),
  status: text("status").notNull().default("pending"),
  totalAmount: doublePrecision("total_amount").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  packageId: true,
  eventDate: true,
  totalAmount: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPhotographer = z.infer<typeof insertPhotographerSchema>;
export type Photographer = typeof photographers.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
