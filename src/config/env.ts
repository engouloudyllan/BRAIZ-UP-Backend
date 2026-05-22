import dotenv from "dotenv";
import { url } from "node:inspector";
import path from "node:path";
import { debugPort } from "node:process";
dotenv.config({ path: path.resolve("./.env") });

const env = {
  whiteListOrigin: process.env.WHITE_LIST_ORIGIN
    ? process.env.WHITE_LIST_ORIGIN.split(",")
    : [],
  port: process.env.PORT || 3001,
  host: process.env.HOST || "127.0.0.1",
  url:
    process.env.URL ||
    `http://${process.env.HOST || "127.0.0.1"}:${process.env.PORT || 3001}`,
  dbPort: process.env.DATABASE_PORT || 3306,
  dbName: process.env.DATABASE_NAME || "braizup",
  dbUser: process.env.DATABASE_USER || "root",
  dbPassword: process.env.DATABASE_PASSWORD || "",
  dbHost: process.env.DATABASE_HOST || "127.0.0.1",
};

export default env;
