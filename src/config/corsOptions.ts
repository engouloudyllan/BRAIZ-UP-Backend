import env from "./env.js";

const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    const req = this; // Hack officiel pour récupérer req

    // Cas mobile : pas d'origin. Autoriser React Native / Postman / apps mobiles
    if (!origin) {
      return callback(null, true); // Autorisé
    }

    // // Cas mobile : pas d'origin, on n'autorise pas
    // if (!origin) {
    //   // On doit vérifier le header nous-mêmes
    //   // CORS ne donne pas accès aux headers ici, donc la validation se fera dans un middleware
    //   return callback(new Error("Missing Origin"));
    // }

    // // CAS MOBILE : pas d'origin mais x-client-type = mobile
    // if (!origin) {
    //   if (req.headers["x-client-type"] === "mobile") {
    //     return callback(null, true); // Autorisé
    //   }
    //   return callback(new Error("Not allowed: missing origin and not mobile"));
    // }

    // CAS NAVIGATEUR : vérifier la whitelist
    if (env.whiteListOrigin.indexOf(origin) !== -1) {
      return callback(null, true); // Autorisé
    }

    return callback(new Error("Not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
  preflightContinue: false,
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  maxAge: 24 * 60 * 60 * 1000, // Mise en cache des regles CORS
  credentials: true, // Autorise les cookies a etre envoyer au frontend et de recevoir aussi
  "Access-Control-Allow-Credentials": true,
};

export const socketCorsOptions = {
  origin: "*",
  methods: ["POST", "GET"],
};

export default corsOptions;
