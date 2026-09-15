import fastify from 'fastify';
import cors from "@fastify/cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log("URI:", process.env.MONGODB_URI); // ← HIER
const server = fastify();
await server.register(cors, {
    origin: "*"
});
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});
server.get('/suggestion', async (request, reply) => {
    return "dune";
});
let savedProfile = null;
server.post('/readingProfile', async (request, reply) => {
    const body = request.body;
    const readingProfile = {
        genre: body.genre,
        taalniveau: body.taalniveau,
        onderwerp: body.onderwerp,
        lengte: body.lengte,
        leesdoel: body.leesdoel
    };
    if (readingProfile.genre === "") {
        return reply.code(400).send({ error: "genre vergeten" });
    }
    savedProfile = readingProfile;
    return reply.code(201).send({ readingProfile });
});
server.get('/readingProfile', async (request, reply) => {
    if (!savedProfile) {
        return reply.code(404).send({ error: "geen profiel gevonden" });
    }
    return reply.code(200).send(savedProfile);
});
// server.post('/readingProfile', async (request, reply) => {
//     const body = request.body as { genre: string };
//     if (!body.genre || body.genre.trim() === "") {
//         return reply.code(400).send({ error: "genre vergeten" });
//     }
//     const profile = await prisma.readingProfile.upsert({
//         where: { userId: request.user.id },
//         update: { genre: body.genre },
//         create: { userId: request.user.id, genre: body.genre }
//     });
//     return reply.code(201).send(profile);
// });
// server.get('/readingProfile', async (request, reply) => {
//     const profile = await prisma.readingProfile.findUnique({
//         where: { userId: request.user.id }
//     });
//     if (!profile) {
//         return reply.code(404).send({ error: "geen profiel gevonden" });
//     }
//     return reply.send(profile);
// });
server.post('/login', async (request, reply) => {
    const body = request.body;
    if (body.username === "teacher" && body.password === "1234") {
        return { role: "teacher" };
    }
    return { role: "student" };
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
server.get('/catalog', async (request, reply) => {
    await client.connect();
    const db = client.db("leescatalogus");
    const collection = db.collection("boeken");
    const books = await collection.find({}).toArray();
    return books;
});
//# sourceMappingURL=index.js.map