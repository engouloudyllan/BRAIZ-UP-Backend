import express from "express";
import path from "node:path";
import env from "./config/env.js";
import { fileURLToPath } from "node:url";
import router from "./routers/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

const app = express();
import cookieParser from "cookie-parser";

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // sinon req.cookies sera undefined
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  }),
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(process.cwd());

app.use("/static", express.static(path.join(projectRoot, "public"))); // Serve static files from the "public" directory

app.use("/api", router);

app.use(errorHandler);

// app.listen(Number(env.port), env.host, () => {
//   console.log(
//     `The application runs at the following URL: http://${env.host}:${env.port}`,
//     console.log(`Allowed origins: ${env.whiteListOrigin.join(", ")}`),
//   );
// });

const port = process.env.PORT || env.port || 3001;
const host = process.env.PORT ? "0.0.0.0" : (env.host || "127.0.0.1");

app.listen(Number(port), host, () => {
  console.log(`The application runs at the following URL: http://${host}:${port}`);
  console.log(`Allowed origins: ${env.whiteListOrigin.join(", ")}`);
});
