// import fastify from 'fastify';
// import cors from "@fastify/cors";
// import fastifyPassport from '@fastify/passport';
// import fastifyJwt from '@fastify/jwt';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import fastifySecureSession from '@fastify/secure-session';
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();
// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import bcrypt from "bcryptjs";
// import authRoutes from "./routes/auth.routes.js";
// import leesprofielRoutes from "./routes/Leesprofiel.routes.js";
// import leeslijst from "./routes/leeslijst.routes.js"
// import docent from "./routes/docent.route.js"
// import adviesRoutes from "./routes/advies.route.js";

// const db = drizzle(process.env.DATABASE_URL!);

// const server = fastify()

// const uri = process.env.MONGODB_URI as string;
// const client = new MongoClient(uri);

// await server.register(cors, {
//   origin: "*",
//   methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
// });

// await server.register(authRoutes);
// await server.register(leesprofielRoutes);
// await server.register(leeslijst);
// await server.register(docent);
// await server.register(adviesRoutes);

// server.listen({ port: 8080 }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });


// // let savedProfile: {genre : string} | null = null;

// // server.post('/readingProfile', async (request, reply) => {
// //      const body = request.body as { 
// //       genre: string 
// //       taalniveau: string;
// //       onderwerp: string;
// //       lengte: string;
// //       leesdoel: string;
// //     };

// //       const readingProfile = {
// //         genre: body.genre,
// //         taalniveau: body.taalniveau,
// //         onderwerp: body.onderwerp,
// //         lengte: body.lengte,
// //         leesdoel: body.leesdoel
// //     };
    
// //     if(readingProfile.genre ===""){
// //     return reply.code(400).send({error: "genre vergeten"});
// // }

// //     savedProfile = readingProfile;

// // return reply.code(201).send({readingProfile});
// // })

// // server.get('/readingProfile', async (request, reply) => {
// //     if (!savedProfile) {
// //         return reply.code(404).send({ error: "geen profiel gevonden" });
// //     }

// //     return reply.code(200).send(savedProfile);
// // });







// server.get<{
//   Querystring: {
//     page?: string;
//     niveau?: string;
//     type?: string;
//     thema?: string;
//   }
// }>('/catalog', async (request, reply) => {
//   await client.connect();
//   const db = client.db("LU1_Database");
//   const collection = db.collection("catalogus");

//   const page = parseInt(request.query.page ?? "1");
//   const limit = 6;
//   const skip = (page - 1) * limit;

//   // ⭐ FILTERS
// const mongoFilter: any = {};

// if (request.query.niveau) {
//   mongoFilter.Niveau = request.query.niveau;
// }

// if (request.query.type) {
//   mongoFilter["Type materiaal"] = { 
//     $regex: `^${request.query.type}$`, 
//     $options: "i" 
//   };
// }

// if (request.query.thema) {
//   mongoFilter.Themas_boek = { 
//     $regex: `(^|;)\\s*${request.query.thema}\\s*(;|$)`,
//     $options: "i"
//   };
// }




//   // ⭐ GEFILTERDE RESULTATEN + PAGINATIE
//   const rawBooks = await collection.find(mongoFilter)
//     .skip(skip)
//     .limit(limit)
//     .toArray();

//   const books = rawBooks.map(book => ({
//      _id: book._id, 
//     Titel: book.Titel,
//     Auteur: book.Auteur,
//     type: book["Type materiaal"],
//     niveau: book.Niveau,
//     thema: book.Themas_boek,
//     beschrijving: book["Korte omschrijving"]
//   }));

//   const total = await collection.countDocuments(mongoFilter);

//   return {
//     page,
//     limit,
//     total,
//     books
//   };
// });


// // server.post<{
// //   Params: { studentId: string };
// //   Body: {
// //     Titel: string;
// //     Auteur: string;
// //     type: string;
// //     niveau: string;
// //     thema: string;
// //     beschrijving: string;
// //   }
// // }>('/leeslijst/:studentId', async (request, reply) => {
// //   await client.connect();
// //   const db = client.db("LU1_Database");
// //   const collection = db.collection("leeslijst");

// //   const { studentId } = request.params;
// //   const book = request.body;

// //   await collection.insertOne({
// //     ...book,
// //     studentId,
// //     gelezen: false
// //   });

// //   return { success: true };
// // });


// // server.get<{
// //   Params: { studentId: string }
// // }>('/leeslijst/:studentId', async (request, reply) => {
// //   await client.connect();
// //   const db = client.db("LU1_Database");
// //   const collection = db.collection("leeslijst");

// //   const { studentId } = request.params;

// // const books = await collection.find({ studentId }).toArray();

// // const cleanBooks = books.map(b => ({
// //   ...b,
// //   _id: b._id.toString()   // ← FIX
// // }));

// // return { books: cleanBooks };

// // });


// // import { ObjectId } from "mongodb";
// // import LeesprofielRoutes from './routes/Leesprofiel.routes.js';

// // server.patch<{
// //   Params: { studentId: string; id: string };
// //   Body: { gelezen: boolean };
// // }>('/leeslijst/:studentId/:id', async (request, reply) => {
// //   await client.connect();
// //   const db = client.db("LU1_Database");
// //   const collection = db.collection("leeslijst");

// //   const { studentId, id } = request.params;
// //   const { gelezen } = request.body;

// //   await collection.updateOne(
// //     { _id: new ObjectId(id), studentId },
// //     { $set: { gelezen } }
// //   );

// //   return { success: true };
// // });

// // server.delete<{
// //   Params: { studentId: string; id: string };
// // }>('/leeslijst/:studentId/:id', async (request, reply) => {
// //   await client.connect();
// //   const db = client.db("LU1_Database");
// //   const collection = db.collection("leeslijst");

// //   const { studentId, id } = request.params;

// //   await collection.deleteOne({ _id: new ObjectId(id), studentId });

// //   return { success: true };
// // });
import "dotenv/config"; // altijd als eerste

import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyPassport from "@fastify/passport";
import fastifyJwt from "@fastify/jwt";
import fastifySecureSession from "@fastify/secure-session";
import { MongoClient } from "mongodb";

import { registerJwtStrategy } from "./auth/jwt.strategy.js";
import authRoutes from "./routes/auth.routes.js";
import leesprofielRoutes from "./routes/Leesprofiel.routes.js";
import leeslijst from "./routes/leeslijst.routes.js";
import docent from "./routes/docent.route.js";
import adviesRoutes from "./routes/advies.route.js";
import koppelRoutes from "./routes/koppel.route.js";

// Duidelijke fout als een geheim ontbreekt
for (const key of ["JWT_SECRET", "SESSION_KEY", "MONGODB_URI"]) {
  if (!process.env[key]) throw new Error(`Omgevingsvariabele ${key} ontbreekt in .env`);
}

const server = fastify();
const client = new MongoClient(process.env.MONGODB_URI as string);

await server.register(cors, {
  origin: "*", // later vervangen door de URL van je frontend
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
});

// ---------- Auth ----------
await server.register(fastifySecureSession, {
  key: Buffer.from(process.env.SESSION_KEY!, "hex"),
});

await server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  decoratorName: "jwtPayload",
  sign: { expiresIn: "2h" },
});

await server.register(fastifyPassport.initialize());
registerJwtStrategy();

// ---------- Routes (pas ná de auth-setup) ----------
await server.register(authRoutes);
await server.register(leesprofielRoutes);
await server.register(leeslijst);
await server.register(docent);
await server.register(adviesRoutes);
await server.register(koppelRoutes);

server.get<{
  Querystring: { page?: string; niveau?: string; type?: string; thema?: string };
}>("/catalog", async (request) => {
  await client.connect();
  const collection = client.db("LU1_Database").collection("catalogus");

  const page = parseInt(request.query.page ?? "1");
  const limit = 6;
  const skip = (page - 1) * limit;

  const mongoFilter: any = {};

  if (request.query.niveau) {
    mongoFilter.Niveau = request.query.niveau;
  }
  if (request.query.type) {
    mongoFilter["Type materiaal"] = {
      $regex: `^${request.query.type}$`,
      $options: "i",
    };
  }
  if (request.query.thema) {
    mongoFilter.Themas_boek = {
      $regex: `(^|;)\\s*${request.query.thema}\\s*(;|$)`,
      $options: "i",
    };
  }

  const rawBooks = await collection.find(mongoFilter).skip(skip).limit(limit).toArray();

  const books = rawBooks.map((book) => ({
    _id: book._id,
    Titel: book.Titel,
    Auteur: book.Auteur,
    type: book["Type materiaal"],
    niveau: book.Niveau,
    thema: book.Themas_boek,
    beschrijving: book["Korte omschrijving"],
  }));

  const total = await collection.countDocuments(mongoFilter);

  return { page, limit, total, books };
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});



