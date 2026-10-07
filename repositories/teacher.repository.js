// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// const db = drizzle(process.env.DATABASE_URL!);
// import { teachers } from "../repositories/schema.js";
// import { eq } from "drizzle-orm";
// export const TeacherRepository = {
//   async findByName(name: string) {
//     return db.select()
//       .from(teachers)
//       .where(eq(teachers.name, name));
//   },
//   async create(name: string, hashedPassword: string, code: string) {
//     return db.insert(teachers).values({
//       name,
//       password: hashedPassword,
//       code
//     });
//   }
// }
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { teachers } from "../repositories/schema.js";
const db = drizzle(process.env.DATABASE_URL);
export const TeacherRepository = {
    async findByName(name) {
        return db.select().from(teachers).where(eq(teachers.name, name));
    },
    async create(name, hashedPassword, code) {
        return db.insert(teachers).values({
            name,
            password: hashedPassword,
            code,
        });
    },
    // Alleen id en naam: nooit het wachtwoord of de registratiecode teruggeven
    async getAll() {
        return db
            .select({ id: teachers.id, name: teachers.name })
            .from(teachers)
            .orderBy(teachers.name);
    },
    async findById(id) {
        const result = await db
            .select({ id: teachers.id, name: teachers.name })
            .from(teachers)
            .where(eq(teachers.id, id));
        return result[0] ?? null;
    },
};
//# sourceMappingURL=teacher.repository.js.map