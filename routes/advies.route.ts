// import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { AdviesService } from "../service/advies.service.js";

// export default async function adviesRoutes(server: FastifyInstance) {
//   server.get("/advies/:studentId",  async (
//     req: FastifyRequest<{ Params: { studentId: string } }>,
//     reply: FastifyReply
//   ) => {
//     const { studentId } = req.params;

//     const result = await AdviesService.genereerAdvies(studentId);

//     if (result.error) {
//       return reply.code(result.status).send({ error: result.error });
//     }

//     return reply.send(result);
//   });
// }
import type { FastifyInstance } from "fastify";
import { AdviesService } from "../service/advies.service.js";
import { authenticate } from "../auth/guards.js";

export default async function adviesRoutes(server: FastifyInstance) {
  server.get("/advies", { preValidation: authenticate }, async (req, reply) => {
    const studentId = String(req.user!.id);
    const result = await AdviesService.genereerAdvies(studentId);

if ("error" in result) {
  return reply.code(result.status ?? 500).send({ error: result.error });
}

    return result;
  });
}