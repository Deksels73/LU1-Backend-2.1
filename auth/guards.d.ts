import type { FastifyRequest, FastifyReply } from "fastify";
export declare const authenticate: import("fastify").preValidationAsyncHookHandler<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, import("fastify").FastifyBaseLogger>;
export declare const onlyTeacher: (request: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare const onlyStudent: (request: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
//# sourceMappingURL=guards.d.ts.map