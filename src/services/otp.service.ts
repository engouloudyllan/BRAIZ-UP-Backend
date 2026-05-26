/**
 * Service OTP — génération, stockage en BD, envoi par email.
 * Type d'OTP :
 *  - EMAIL_VERIFICATION : pour valider l'email lors de l'inscription
 *  - PASSWORD_RESET     : pour réinitialiser le mot de passe
 */
import nodemailer from "nodemailer";
import env from "../config/env.js";
import { prisma } from "../models/index.js";
import type { OtpType } from "@prisma/client";

let _transporter: nodemailer.Transporter | null = null;
function getTransporter(): nodemailer.Transporter | null {
  if (!env.smtpUser || !env.smtpPass) return null;
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: { user: env.smtpUser, pass: env.smtpPass },
    });
  }
  return _transporter;
}

function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function otpEmailTemplate(code: string, purpose: string, name?: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fdf6f0;font-family:Arial,sans-serif;color:#333">
  <div style="max-width:480px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
    <div style="background:#5C0A0A;color:#fff;padding:24px;text-align:center">
      <h1 style="margin:0;font-size:22px;letter-spacing:2px">🍔 BRAIZ'UP</h1>
    </div>
    <div style="padding:32px 24px;text-align:center">
      <p style="font-size:14px;color:#666;margin:0 0 8px">Bonjour ${name ? `<strong>${name}</strong>` : "👋"},</p>
      <h2 style="margin:0 0 12px;color:#5C0A0A">${purpose}</h2>
      <p style="font-size:13px;color:#666;margin:0 0 24px">
        Voici votre code de vérification. Il expire dans <strong>${env.otpExpiresMinutes} minutes</strong>.
      </p>
      <div style="display:inline-block;background:#fbede3;border:2px dashed #5C0A0A;border-radius:12px;padding:20px 40px;margin:0 0 24px">
        <p style="margin:0;font-size:36px;font-weight:bold;letter-spacing:12px;color:#5C0A0A;font-family:'Courier New',monospace">
          ${code}
        </p>
      </div>
      <p style="font-size:11px;color:#999;margin:0">
        Si vous n'avez pas demandé ce code, ignorez ce message.
      </p>
    </div>
    <div style="padding:16px;background:#fbede3;text-align:center;font-size:11px;color:#7a4a37">
      © BRAIZ'UP — Cameroun
    </div>
  </div>
</body></html>`;
}

async function sendOtpEmail(
  to: string,
  code: string,
  type: OtpType,
  name?: string,
) {
  const purpose =
    type === "EMAIL_VERIFICATION"
      ? "Vérification de votre email"
      : "Réinitialisation de mot de passe";

  const transporter = getTransporter();
  if (!transporter) {
    // Pas de SMTP configuré : on log pour le dev
    console.warn(
      `📧 [OTP DEV → ${to}] type=${type} code=${code} (SMTP non configuré)`,
    );
    return;
  }

  try {
    await transporter.sendMail({
      from: `"${env.smtpFromName}" <${env.smtpUser}>`,
      to,
      subject: `${purpose} — Code : ${code}`,
      html: otpEmailTemplate(code, purpose, name),
    });
    console.log(`📧 [OTP OK → ${to}] ${type}`);
  } catch (err: any) {
    console.error(`📧 [OTP FAIL → ${to}]`, err.message ?? err);
    // En dev, on log le code pour pouvoir tester quand même
    console.warn(`   ↳ Code de secours (dev) : ${code}`);
  }
}

/**
 * Génère un OTP, le stocke en base (invalide les anciens du même type),
 * et envoie l'email. Retourne le code en clair UNIQUEMENT en dev (pour debug).
 */
export async function createAndSendOtp(
  userId: number,
  userEmail: string,
  userName: string | undefined,
  type: OtpType,
): Promise<{ sent: boolean }> {
  // Supprime les anciens OTP du même type pour cet user
  await prisma.otp.deleteMany({ where: { userId, type } });

  const code = generate6DigitCode();
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  await prisma.otp.create({
    data: { code, type, userId, expiresAt },
  });

  await sendOtpEmail(userEmail, code, type, userName);

  return { sent: true };
}

/**
 * Vérifie un OTP. Retourne true s'il est valide et non expiré.
 * Le supprime après usage réussi.
 */
export async function verifyOtp(
  userId: number,
  code: string,
  type: OtpType,
): Promise<boolean> {
  const otp = await prisma.otp.findFirst({
    where: { userId, type, code },
  });
  if (!otp) return false;
  if (otp.expiresAt < new Date()) {
    await prisma.otp.delete({ where: { id: otp.id } });
    return false;
  }
  // OK : on consomme le code
  await prisma.otp.delete({ where: { id: otp.id } });
  return true;
}
