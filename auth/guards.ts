import fastifyPassport from "@fastify/passport";
import type { FastifyRequest, FastifyReply } from "fastify";

export const authenticate = fastifyPassport.authenticate("jwt", {
  session: false,
});

export const onlyTeacher = async (request: FastifyRequest, reply: FastifyReply) => {
  if (request.user?.role !== "teacher") {
    return reply.code(403).send({ error: "Geen toegang." });
  }
};

export const onlyStudent = async (request: FastifyRequest, reply: FastifyReply) => {
  if (request.user?.role !== "student") {
    return reply.code(403).send({ error: "Geen toegang." });
  }
};