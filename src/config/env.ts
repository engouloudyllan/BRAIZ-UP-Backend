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

  // ── Notifications ──────────────────────────────────────────────────────
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPhone: process.env.ADMIN_PHONE || "", // +237xxxxxxxxx
  adminWhatsappApiKey: process.env.ADMIN_WHATSAPP_APIKEY || "", // CallMeBot key for admin
  clientWhatsappApiKey: process.env.CLIENT_WHATSAPP_APIKEY || "", // Optional: skip if client not registered

  // SMTP (Gmail recommended : "App password" required if 2FA on)
  smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  smtpFromName: process.env.SMTP_FROM_NAME || "BRAIZ'UP",

  // ── Auth (JWT) ─────────────────────────────────────────────────────────
  jwtSecret: process.env.JWT_SECRET || "braizup-dev-secret-CHANGE-IN-PRODUCTION",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  // OTP : validité du code en minutes
  otpExpiresMinutes: Number(process.env.OTP_EXPIRES_MINUTES || 10),
};

export default env;
