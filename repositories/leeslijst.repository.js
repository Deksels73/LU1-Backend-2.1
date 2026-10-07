import { leeslijst } from "../repositories/schema.js";
import { eq, and } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(process.env.DATABASE_URL);
export const LeeslijstRepository = {
    async add(studentId, bookId) {
        await db.insert(leeslijst).values({
            studentId,
            bookId,
            gelezen: false
        });
        return { success: true };
    },
    async exists(studentId, bookId) {
        const result = await db
            .select()
            .from(leeslijst)
            .where(and(eq(leeslijst.studentId, studentId), eq(leeslijst.bookId, bookId)));
        return result.length > 0;
    },
    async get(studentId) {
        return await db
            .select()
            .from(leeslijst)
            .where(eq(leeslijst.studentId, studentId));
    },
    async update(studentId, id, gelezen) {
        await db
            .update(leeslijst)
            .set({ gelezen })
            .where(eq(leeslijst.id, id));
        return { success: true };
    },
    async remove(studentId, id) {
        await db
            .delete(leeslijst)
            .where(eq(leeslijst.id, id));
        return { success: true };
    }
};
//# sourceMappingURL=leeslijst.repository.js.map