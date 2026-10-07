// import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { LeeslijstService } from "../service/leeslijst.service.js";
import { LeeslijstService } from "../service/leeslijst.service.js";
import { authenticate } from "../auth/guards.js";
export default async function leeslijstRoutes(server) {
    // POST → boek toevoegen
    server.post("/leeslijst", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const book = req.body;
        const result = await LeeslijstService.add(studentId, book);
        if ("error" in result) {
            return reply.code(result.status ?? 500).send(result);
        }
        return reply.code(201).send(result);
    });
    // GET → ophalen
    server.get("/leeslijst", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const books = await LeeslijstService.get(studentId);
        return reply.code(200).send({ books });
    });
    // PATCH → gelezen togglen
    server.patch("/leeslijst/:id", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const { id } = req.params;
        const { gelezen } = req.body;
        const result = await LeeslijstService.update(studentId, id, gelezen);
        return reply.code(200).send(result);
    });
    // DELETE → verwijderen
    server.delete("/leeslijst/:id", { preValidation: authenticate }, async (req, reply) => {
        const studentId = String(req.user.id);
        const { id } = req.params;
        const result = await LeeslijstService.remove(studentId, id);
        return reply.code(200).send(result);
    });
}
//# sourceMappingURL=leeslijst.routes.js.map