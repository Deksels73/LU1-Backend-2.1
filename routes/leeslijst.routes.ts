// import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { LeeslijstService } from "../service/leeslijst.service.js";

// export default async function leeslijstRoutes(server: FastifyInstance) {

// server.post(
//   "/leeslijst/:studentId",
//   async (
//     req: FastifyRequest<{ Params: { studentId: string } }>,
//     reply: FastifyReply
//   ) => {
//     const { studentId } = req.params;
//     const book = req.body as any;

//     const result = await LeeslijstService.add(studentId, book);

//     if ("error" in result) {
//       return reply.code(result.status).send(result);
//     }

//     return reply.code(201).send(result);
//   }
// );

// // ⭐ GET → ophalen
//   server.get(
//     "/leeslijst/:studentId",
//     async (
//       req: FastifyRequest<{ Params: { studentId: string } }>,
//       reply: FastifyReply
//     ) => {
//       const { studentId } = req.params;
//       const books = await LeeslijstService.get(studentId);
//       return reply.code(200).send({ books });
//     }
//   );

//   // ⭐ PATCH → gelezen togglen
//   server.patch(
//     "/leeslijst/:studentId/:id",
//     async (
//       req: FastifyRequest<{ Params: { studentId: string; id: string }, Body: { gelezen: boolean } }>,
//       reply: FastifyReply
//     ) => {
//       const { studentId, id } = req.params;
//       const { gelezen } = req.body;

//       const result = await LeeslijstService.update(studentId, id, gelezen);
//       return reply.code(200).send(result);
//     }
//   );

//   // ⭐ DELETE → verwijderen
//   server.delete(
//     "/leeslijst/:studentId/:id",
//     async (
//       req: FastifyRequest<{ Params: { studentId: string; id: string } }>,
//       reply: FastifyReply
//     ) => {
//       const { studentId, id } = req.params;

//       const result = await LeeslijstService.remove(studentId, id);
//       return reply.code(200).send(result);
//     }
//   );

// }
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { LeeslijstService } from "../service/leeslijst.service.js";
import { authenticate } from "../auth/guards.js";

export default async function leeslijstRoutes(server: FastifyInstance) {
  // POST → boek toevoegen
  server.post(
    "/leeslijst",
    { preValidation: authenticate },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const studentId = String(req.user!.id);
      const book = req.body as any;

      const result = await LeeslijstService.add(studentId, book);

      if ("error" in result) {
        return reply.code(result.status ?? 500).send(result);
      }

      return reply.code(201).send(result);
    }
  );

  // GET → ophalen
  server.get(
    "/leeslijst",
    { preValidation: authenticate },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const studentId = String(req.user!.id);
      const books = await LeeslijstService.get(studentId);
      return reply.code(200).send({ books });
    }
  );

// PATCH → gelezen togglen
server.patch<{ Params: { id: string }; Body: { gelezen: boolean } }>(
  "/leeslijst/:id",
  { preValidation: authenticate },
  async (req, reply) => {
    const studentId = String(req.user!.id);
    const { id } = req.params;
    const { gelezen } = req.body;

    const result = await LeeslijstService.update(studentId, id, gelezen);
    return reply.code(200).send(result);
  }
);

// DELETE → verwijderen
server.delete<{ Params: { id: string } }>(
  "/leeslijst/:id",
  { preValidation: authenticate },
  async (req, reply) => {
    const studentId = String(req.user!.id);
    const { id } = req.params;

    const result = await LeeslijstService.remove(studentId, id);
    return reply.code(200).send(result);
  }
);
}