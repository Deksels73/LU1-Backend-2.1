// // routes/auth.routes.ts
// import type { FastifyInstance } from "fastify";
// import { AuthService } from "../service/auth.service.js";

// export default async function authRoutes(server: FastifyInstance) {

//   server.post("/register", async (req, reply) => {
//     const { name, password, code } = req.body as {
//       name: string;
//       password: string;
//       code: string;
//     };

//     const result = await AuthService.register(name, password, code);

//     if (result.error) {
//       return reply.code(result.status).send({ error: result.error });
//     }

//     return reply.send(result);
//   });

//   server.post("/login", async (req, reply) => {
//     const { name, password } = req.body as {
//       name: string;
//       password: string;
//     };

//     const result = await AuthService.login(name, password);

//     if (result.error) {
//       return reply.code(result.status).send({ error: result.error });
//     }

//     return reply.send(result);
//   });
// }
import type { FastifyInstance } from "fastify";
import { AuthService } from "../service/auth.service.js";
import { authenticate } from "../auth/guards.js";

export default async function authRoutes(server: FastifyInstance) {
  server.post("/register", async (req, reply) => {
    const { name, password, code } = req.body as {
      name: string;
      password: string;
      code: string;
    };

    const result = await AuthService.register(name, password, code);

    if (result.error) {
      return reply.code(result.status).send({ error: result.error });
    }

    return reply.code(201).send(result);
  });

  server.post("/login", async (req, reply) => {
    const { name, password } = req.body as {
      name: string;
      password: string;
    };

    const result = await AuthService.login(name, password);

    if (result.error) {
      return reply.code(result.status).send({ error: result.error });
    }

    // Geen wachtwoord in de token
    const token = server.jwt.sign({
      id: result.id,
      name: result.name,
      role: result.role,
    });

    return reply.send({
      token,
      role: result.role,
      id: result.id,
      name: result.name,
    });
  });

  // Handig om je token te testen
  server.get("/me", { preValidation: authenticate }, async (req) => {
    return { user: req.user };
  });
}