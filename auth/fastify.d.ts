import "fastify";

declare module "fastify" {
  interface PassportUser {
    id: string | number;
    name: string;
    role: "teacher" | "student";
  }
}