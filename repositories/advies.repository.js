import { leesprofiel, leesadvies } from "../repositories/schema.js";
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(process.env.DATABASE_URL);
export const AdviesRepository = {
    async getProfiel(studentId) {
        const result = await db
            .select()
            .from(leesprofiel)
            .where(eq(leesprofiel.studentId, studentId));
        return result[0] || null;
    },
    async saveAdvies(studentId, advies) {
        for (const item of advies) {
            await db.insert(leesadvies).values({
                studentId,
                bookId: item.bookId,
                reason: item.reason
            });
        }
    },
    async getAdvies(studentId) {
        return db
            .select()
            .from(leesadvies)
            .where(eq(leesadvies.studentId, studentId));
    },
    async deleteAdvies(studentId) {
        await db.delete(leesadvies).where(eq(leesadvies.studentId, studentId));
    }
};
//# sourceMappingURL=advies.repository.js.map