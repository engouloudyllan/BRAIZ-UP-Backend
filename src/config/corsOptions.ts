import env from "./env.js";
import type { CorsOptions } from "cors";

/**
 * Configuration CORS robuste :
 * - Autorise la whitelist d'origines (.env WHITE_LIST_ORIGIN, séparé par virgules)
 * - Autorise OPTIONS (preflight) — sinon les requêtes JSON+Authorization échouent
 * - Autorise les headers Authorization, Content-Type, Accept (sinon "Failed to fetch")
 * - Accepte les requêtes sans Origin (mobile, Postman, curl)
 * - Credentials activé pour les cookies
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Mobile / Postman / curl : pas d'origin → autorisé
    if (!origin) return callback(null, true);

    if (env.whiteListOrigin.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    console.warn(
      `[CORS] Origin "${origin}" rejeté. Whitelist : ${JSON.stringify(env.whiteListOrigin)}`,
    );
    return callback(new Error("Not allowed by CORS"));
  },

  // CRITIQUE : inclure OPTIONS pour le preflight
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  // CRITIQUE : autoriser explicitement les headers que le front envoie
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
    "X-Client-Type",
    "X-Session-Id", // sessionId du panier invité (fiable cross-origin)
  ],

  // Headers que le front peut LIRE dans la réponse
  exposedHeaders: ["Content-Disposition", "X-Session-Id"],

  credentials: true, // cookies + Authorization
  optionsSuccessStatus: 200, // certains anciens navigateurs (IE11) refusent 204
  preflightContinue: false,
  maxAge: 86400, // 24h de cache CORS
};

export default corsOptions;
