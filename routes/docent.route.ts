// import type { FastifyInstance } from "fastify";
// import { DocentService } from "../service/docent.service.js";

// export default async function docentRoutes(server: FastifyInstance) {

//   server.get("/docent/students/:teacherId", async (req, reply) => {
//     const { teacherId } = req.params as any;
//     const students = await DocentService.getStudents(Number(teacherId));
//     return reply.send({ students });
//   });

//   server.get("/docent/leeslijst/:studentId", async (req, reply) => {
//     const { studentId } = req.params as any;
//     const books = await DocentService.getLeeslijst(studentId);
//     return reply.send({ books });
//   });

//   server.post("/docent/leeslijst/:studentId/add", async (req, reply) => {
//   const { studentId } = req.params as any;
//   const { bookId } = req.body as any;

//   const result = await DocentService.addBook(studentId, bookId);

//   if ("error" in result) {
//     return reply.code(result.status).send(result);
//   }

//   return reply.send(result);
// });

// }
import type { FastifyInstance } from "fastify";
import { DocentService } from "../service/docent.service.js";
import { authenticate, onlyTeacher } from "../auth/guards.js";

const teacherOnly = [authenticate, onlyTeacher];

export default async function docentRoutes(server: FastifyInstance) {
  // Leerlingen van de ingelogde docent (id uit het token)
  server.get("/docent/students", { preValidation: teacherOnly }, async (req, reply) => {
    const teacherId = Number(req.user!.id);
    const students = await DocentService.getStudents(teacherId);
    return reply.send({ students });
  });

  // Leeslijst van een leerling (alleen als de leerling bij deze docent hoort)
  server.get<{ Params: { studentId: string } }>(
    "/docent/leeslijst/:studentId",
    { preValidation: teacherOnly },
    async (req, reply) => {
      const teacherId = Number(req.user!.id);
      const { studentId } = req.params;

      if (!(await DocentService.heeftStudent(teacherId, studentId))) {
        return reply.code(403).send({ error: "Deze leerling is niet aan jou gekoppeld." });
      }

      const books = await DocentService.getLeeslijst(studentId);
      return reply.send({ books });
    }
  );

  // Boek toevoegen aan de leeslijst van een leerling
  server.post<{ Params: { studentId: string }; Body: { bookId: string } }>(
    "/docent/leeslijst/:studentId/add",
    { preValidation: teacherOnly },
    async (req, reply) => {
      const teacherId = Number(req.user!.id);
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
    }
  );
}