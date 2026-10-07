import fastifyPassport from "@fastify/passport";
export const authenticate = fastifyPassport.authenticate("jwt", {
    session: false,
});
export const onlyTeacher = async (request, reply) => {
    if (request.user?.role !== "teacher") {
        return reply.code(403).send({ error: "Geen toegang." });
    }
};
export const onlyStudent = async (request, reply) => {
    if (request.user?.role !== "student") {
        return reply.code(403).send({ error: "Geen toegang." });
    }
};
//# sourceMappingURL=guards.js.map