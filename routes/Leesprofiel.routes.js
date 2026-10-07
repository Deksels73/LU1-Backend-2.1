// import type { FastifyInstance } from "fastify";
// import { LeesprofielService } from "../service/leesprofiel.service.js";
import { LeesprofielService } from "../service/leesprofiel.service.js";
import { authenticate } from "../auth/guards.js";
export default async function leesprofielRoutes(server) {
    // PROFIEL OPSLAAN
    server.post("/leesprofiel", { preValidation: authenticate }, async (req, reply) => {
        // Het id komt uit het token, niet uit de URL of body
        const studentId = String(req.user.id);
        const result = await LeesprofielService.save(studentId, req.body);
        if (result.error) {
            return reply.code(result.status ?? 500).send({ error: result.error });
        }
        return reply.send(result);
    });
    // PROFIEL OPHALEN
    server.get("/leesprofiel", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const result = await LeesprofielService.get(studentId);
        if ("error" in result) {
            return reply.code(result.status ?? 500).send({ error: result.error });
        }
        return reply.send(result);
    });
    // PROFIEL BEWERKEN
    server.put("/leesprofiel", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const updated = await LeesprofielService.update(studentId, req.body);
        return reply.code(200).send(updated);
    });
}
//# sourceMappingURL=Leesprofiel.routes.js.map