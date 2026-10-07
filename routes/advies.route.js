// import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { AdviesService } from "../service/advies.service.js";
import { AdviesService } from "../service/advies.service.js";
import { authenticate } from "../auth/guards.js";
export default async function adviesRoutes(server) {
    server.get("/advies", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const result = await AdviesService.genereerAdvies(studentId);
        if ("error" in result) {
            return reply.code(result.status ?? 500).send({ error: result.error });
        }
        return result;
    });
}
//# sourceMappingURL=advies.route.js.map