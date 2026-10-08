CREATE TABLE "reading_advice" (
	"id" serial PRIMARY KEY,
	"student_id" varchar NOT NULL,
	"book_id" varchar NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leeslijst" (
	"id" serial PRIMARY KEY,
	"student_id" varchar NOT NULL,
	"book_id" varchar NOT NULL,
	"gelezen" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "reading_profile" (
	"id" serial PRIMARY KEY,
	"student_id" varchar NOT NULL,
	"taalniveau" varchar NOT NULL,
	"genre" text NOT NULL,
	"onderwerp" text NOT NULL,
	"lengte" varchar NOT NULL,
	"leesdoel" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"password" varchar NOT NULL,
	"code" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher_student" (
	"teacher_id" integer NOT NULL,
	"student_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"password" varchar NOT NULL,
	"code" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "teacher_student" ADD CONSTRAINT "teacher_student_teacher_id_teachers_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "teacher_student" ADD CONSTRAINT "teacher_student_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");