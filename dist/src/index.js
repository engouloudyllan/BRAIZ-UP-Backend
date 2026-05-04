import express from "express";
import path from "node:path";
import env from "./config/env.js";
import { fileURLToPath } from "node:url";
import router from "./routers/index.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/api", router);
app.listen(Number(env.port), env.host, () => {
    console.log(`The application runs at the following URL: http://${env.host}:${env.port}`);
});
//# sourceMappingURL=index.js.map