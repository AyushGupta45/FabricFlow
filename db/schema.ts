import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  requirement: text("requirement").notNull(),
  meters: integer("meters"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: text("order_id").notNull().unique(),
  enquiryId: uuid("enquiry_id").references(() => enquiries.id, {
    onDelete: "set null",
  }),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  fabricType: text("fabric_type"),
  meters: integer("meters").notNull(),
  status: text("status").notNull().default("Received"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
