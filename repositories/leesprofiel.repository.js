import { leesprofiel } from "../repositories/schema.js";
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(process.env.DATABASE_URL);
export const LeesprofielRepository = {
    async save(studentId, data) {
        return db.insert(leesprofiel).values({
            studentId,
            taalniveau: data.niveau,
            genre: JSON.stringify(data.genre),
            onderwerp: JSON.stringify(data.onderwerp),
            lengte: data.lengte,
            leesdoel: data.leesdoel
        });
    },
    async get(studentId) {
        const result = await db
            .select()
            .from(leesprofiel)
            .where(eq(leesprofiel.studentId, studentId));
        if (result.length === 0)
            return null;
        const row = result[0];
        return {
            id: row.id,
            studentId: row.studentId,
            niveau: row.taalniveau,
            genre: JSON.parse(row.genre),
            onderwerp: JSON.parse(row.onderwerp),
            lengte: row.lengte,
            leesdoel: row.leesdoel
        };
    },
    async update(studentId, data) {
        await db
            .update(leesprofiel)
            .set({
            taalniveau: data.niveau,
            genre: JSON.stringify(data.genre),
            onderwerp: JSON.stringify(data.onderwerp),
            lengte: data.lengte,
            leesdoel: data.leesdoel
        })
            .where(eq(leesprofiel.studentId, studentId));
        // stuur het geüpdatete profiel terug
        return await this.get(studentId);
    }
};
//# sourceMappingURL=leesprofiel.repository.js.map