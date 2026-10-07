// import type { FastifyInstance } from "fastify";
// import { DocentService } from "../service/docent.service.js";
import { DocentService } from "../service/docent.service.js";
import { authenticate, onlyTeacher } from "../auth/guards.js";
const teacherOnly = [authenticate, onlyTeacher];
export default async function docentRoutes(server) {
    // Leerlingen van de ingelogde docent (id uit het token)
    server.get("/docent/students", { preValidation: teacherOnly }, async (req, reply) => {
        const teacherId = Number(req.user.id);
        const students = await DocentService.getStudents(teacherId);
        return reply.send({ students });
    });
    // Leeslijst van een leerling (alleen als de leerling bij deze docent hoort)
    server.get("/docent/leeslijst/:studentId", { preValidation: teacherOnly }, async (req, reply) => {
        const teacherId = Number(req.user.id);
        const { studentId } = req.params;
        if (!(await DocentService.heeftStudent(teacherId, studentId))) {
            return reply.code(403).send({ error: "Deze leerling is niet aan jou gekoppeld." });
        }
        const books = await DocentService.getLeeslijst(studentId);
        return reply.send({ books });
    });
    // Boek toevoegen aan de leeslijst van een leerling
    server.post("/docent/leeslijst/:studentId/add", { preValidation: teacherOnly }, async (req, reply) => {
        const teacherId = Number(req.user.id);
        const { studentId } = req.params;
        const { bookId } = req.body;
        if (!(await DocentService.heeftStudent(teacherId, studentId))) {
            return reply.code(403).send({ error: "Deze leerling is niet aan jou gekoppeld." });
        }
        const result = await DocentService.addBook(studentId, bookId);
        if ("error" in result) {
            return reply.code(result.status ?? 500).send(result);
        }
        return reply.send(result);
    });
}
//# sourceMappingURL=docent.route.js.map