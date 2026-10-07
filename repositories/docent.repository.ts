import { teacherStudent, students, leeslijst } from "../repositories/schema.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export const DocentRepository = {

  async getStudents(teacherId: number) {
    return await db
      .select({
        id: students.id,
        name: students.name,
        code: students.code
      })
      .from(teacherStudent)
      .leftJoin(students, eq(teacherStudent.studentId, students.id))
      .where(eq(teacherStudent.teacherId, teacherId));
  },

  async getLeeslijst(studentId: string) {
    return await db
      .select()
      .from(leeslijst)
      .where(eq(leeslijst.studentId, studentId));
  },

  async exists(studentId: string, bookId: string) {
    const result = await db
      .select()
      .from(leeslijst)
.where(
  and(
    eq(leeslijst.studentId, studentId),
    eq(leeslijst.bookId, bookId)
  )
)
;

    return result.length > 0;
  },

  async addBook(studentId: string, bookId: string) {
    await db.insert(leeslijst).values({
      studentId,
      bookId,
      gelezen: false
    });

    return { success: true };
  }
};
