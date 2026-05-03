import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve("./.env") });
const env = {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "127.0.0.1",
};
export default env;
//# sourceMappingURL=env.js.map