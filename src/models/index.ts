import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import env from "../config/env.js";

const adapter = new PrismaMariaDb({
  host: env.dbHost,
  port: Number(env.dbPort),
  connectionLimit: 5,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
