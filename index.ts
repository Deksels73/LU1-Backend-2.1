import fastify from 'fastify'
import cors from "@fastify/cors"

const server = fastify()

await server.register(cors, {
    origin:"*"
})

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.get('/suggestion', async (request, reply) => {
return "dune";
})

server.post('/readingProfile', async (request, reply) =>
{

}) 

server.get('/readingProfile', async (request, reply) => {

return "halo";
})


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})