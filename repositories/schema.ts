// db/schema.ts
import { pgTable, serial, varchar, text, boolean } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  password: varchar("password").notNull(),
  code: varchar("code").notNull(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  password: varchar("password").notNull(),
  code: varchar("code").notNull(),


});

export const teacherStudent = pgTable("teacher_student", {
  teacherId: integer("teacher_id").notNull().references(() => teachers.id),
  studentId: integer("student_id").notNull().references(() => students.id)
});


export const leesprofiel = pgTable("reading_profile", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").notNull(),
  taalniveau: varchar("taalniveau").notNull(),
  genre: text("genre").notNull(),        // JSON-string
  onderwerp: text("onderwerp").notNull(), // JSON-string
  lengte: varchar("lengte").notNull(),
  leesdoel: text("leesdoel").notNull()
});

export const leeslijst = pgTable("leeslijst", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").notNull(),
  bookId: varchar("book_id").notNull(),
  gelezen: boolean("gelezen").default(false),


});

// LEESADVIES (FR3)
export const leesadvies = pgTable("reading_advice", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").notNull(),
  bookId: varchar("book_id").notNull(),
  reason: text("reason").notNull()
});


