import type { FastifyInstance } from "fastify";
import { KoppelService } from "../service/koppel.service.js";
import { authenticate, onlyStudent } from "../auth/guards.js";

const studentOnly = [authenticate, onlyStudent];

export default async function koppelRoutes(server: FastifyInstance) {
  // Alle docenten om uit te kiezen (alleen id en naam)
  server.get("/docenten", { preValidation: studentOnly }, async (_req, reply) => {
    const docenten = await KoppelService.getDocenten();
    return reply.send({ docenten });
  });

  // Huidige docent van de ingelogde leerling
  server.get("/student/docent", { preValidation: studentOnly }, async (req, reply) => {
    const studentId = Number(req.user!.id);
    const docent = await KoppelService.getMijnDocent(studentId);
    return reply.send({ docent });
  });

  // Docent kiezen of wijzigen
  server.put<{ Body: { teacherId: number } }>(
    "/student/docent",
    { preValidation: studentOnly },
    async (req, reply) => {
      const studentId = Number(req.user!.id);
      const result = await KoppelService.kiesDocent(studentId, req.body?.teacherId);

      if ("error" in result) {
        return reply.code(result.status).send({ error: result.error });
      }

      return reply.send(result);
    }
  );
}