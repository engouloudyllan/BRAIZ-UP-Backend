/**
 * Service de notifications RÉELLES (Email + WhatsApp)
 * ───────────────────────────────────────────────────
 * Email   : Nodemailer + Gmail SMTP (gratuit, 500 emails/jour)
 * WhatsApp: CallMeBot API (gratuit, illimité avec inscription perso)
 *
 * Configuration (.env):
 *   SMTP_USER, SMTP_PASS               → Gmail "App password"
 *   ADMIN_EMAIL, ADMIN_PHONE           → destinataires admin
 *   ADMIN_WHATSAPP_APIKEY              → clé CallMeBot pour le numéro admin
 *   CLIENT_WHATSAPP_APIKEY (optionnel) → clé partagée pour clients enregistrés
 *
 * IMPORTANT: les fonctions n'échouent JAMAIS — un envoi raté est loggé
 * et n'empêche pas la création de la commande.
 */

import nodemailer from "nodemailer";
import env from "../config/env.js";

interface OrderWithDetails {
  id: number;
  codeTicket: string;
  trackingToken: string;
  totalAmount: number;
  totalProducts?: number;
  shippingFee?: number;
  status: string;
  paymentMethod?: string;
  shippingAddress?: string;
  proximityAddress?: string | null;
  guestName?: string | null;
  guestSurname?: string | null;
  guestPhone?: string | null;
  guestEmail?: string | null;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
  } | null;
  items?: Array<{
    quantity: number;
    unitPrice: number;
    product?: { name: string } | null;
  }>;
}

const STATUS_LABELS: Record<string, string> = {
  EN_PRECOMMANDE: "Précommande",
  EN_COURS_DE_PREPARATION: "En cours de préparation",
  PRÊTE: "Prête",
  EN_LIVRAISON: "En livraison",
  LIVRÉE: "Livrée",
  ANNULÉE: "Annulée",
};

const PAYMENT_LABELS: Record<string, string> = {
  ORANGE_MONEY: "Orange Money",
  MTN_MOBILE_MONEY: "MTN Mobile Money",
  CASH_ON_DELIVERY: "Espèces à la livraison",
};

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────
function buildTrackingUrl(token: string) {
  return `${env.frontendUrl}/tracking/${token}`;
}

function getClientContact(order: OrderWithDetails) {
  const email = order.user?.email ?? order.guestEmail ?? null;
  const phone = order.user?.phoneNumber ?? order.guestPhone ?? null;
  const name = order.user?.firstName
    ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}`.trim()
    : `${order.guestName ?? ""} ${order.guestSurname ?? ""}`.trim() || "Client";
  return { email, phone, name };
}

function normalizePhone(phone: string): string {
  // Retire tous les caractères non-numériques sauf le + en début
  const cleaned = phone.replace(/[^\d+]/g, "");
  // Pour CallMeBot : pas de + dans l'URL
  return cleaned.replace(/^\+/, "");
}

function formatPrice(n: number): string {
  return n.toLocaleString("fr-FR") + " FCFA";
}

// ────────────────────────────────────────────────────────────────────────
// Email — Nodemailer + Gmail SMTP
// ────────────────────────────────────────────────────────────────────────
let _transporter: nodemailer.Transporter | null = null;

// function getTransporter(): nodemailer.Transporter | null {
//   if (!env.smtpUser || !env.smtpPass) {
//     return null; // Pas configuré : on skip silencieusement
//   }
//   if (!_transporter) {
//     _transporter = nodemailer.createTransport({
//       host: env.smtpHost,
//       port: env.smtpPort,
//       secure: env.smtpPort === 465, // true pour 465, false sinon (587 = STARTTLS)
//       auth: {
//         user: env.smtpUser,
//         pass: env.smtpPass,
//       },
//     });
//   }
//   return _transporter;
// }

function getTransporter(): nodemailer.Transporter | null {
  if (!env.smtpUser || !env.smtpPass) {
    return null;
  }
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      family: 4,          // force IPv4 – résout le problème réseau
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    } as nodemailer.TransportOptions); // ← cast
  }
  return _transporter;
}

async function sendEmail(to: string, subject: string, html: string) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(
      `📧 [EMAIL SKIP → ${to}] SMTP non configuré (.env SMTP_USER/SMTP_PASS manquants)`,
    );
    return;
  }
  try {
    const info = await transporter.sendMail({
      from: `"${env.smtpFromName}" <${env.smtpUser}>`,
      to,
      subject,
      html,
    });
    console.log(`📧 [EMAIL OK → ${to}] ${subject} (id: ${info.messageId})`);
  } catch (err: any) {
    console.error(`📧 [EMAIL FAIL → ${to}]`, err.message ?? err);
  }
}

// ────────────────────────────────────────────────────────────────────────
// WhatsApp — CallMeBot API (gratuit)
// ────────────────────────────────────────────────────────────────────────
async function sendWhatsApp(toPhone: string, apiKey: string, body: string) {
  if (!apiKey) {
    console.warn(
      `📱 [WHATSAPP SKIP → ${toPhone}] Clé API CallMeBot manquante`,
    );
    return;
  }
  const phone = normalizePhone(toPhone);
  if (!phone) return;

  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", phone);
  url.searchParams.set("text", body);
  url.searchParams.set("apikey", apiKey);

  try {
    const resp = await fetch(url.toString(), { method: "GET" });
    const text = await resp.text();
    if (resp.ok && /Message queued|Message sent/i.test(text)) {
      console.log(`📱 [WHATSAPP OK → +${phone}]`);
    } else {
      console.warn(
        `📱 [WHATSAPP RESP → +${phone}] HTTP ${resp.status} : ${text.slice(0, 200)}`,
      );
    }
  } catch (err: any) {
    console.error(`📱 [WHATSAPP FAIL → +${phone}]`, err.message ?? err);
  }
}

// ────────────────────────────────────────────────────────────────────────
// Templates HTML
// ────────────────────────────────────────────────────────────────────────
function emailWrapper(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#fdf6f0;font-family:Arial,sans-serif;color:#333">
  <div style="max-width:600px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
    <div style="background:#5C0A0A;color:#fff;padding:24px;text-align:center">
      <h1 style="margin:0;font-size:22px">🍔 BRAIZ'UP</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.85">${title}</p>
    </div>
    <div style="padding:24px;font-size:14px;line-height:1.6">
      ${content}
    </div>
    <div style="padding:16px;background:#fbede3;text-align:center;font-size:12px;color:#7a4a37">
      © BRAIZ'UP — Grillades, Burgers & Jus Naturels
    </div>
  </div>
</body></html>`;
}

function buildItemsTable(order: OrderWithDetails): string {
  if (!order.items?.length) return "";
  const rows = order.items
    .map(
      (it) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${it.product?.name ?? "Produit"} × ${it.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${formatPrice(it.unitPrice * it.quantity)}</td>
    </tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;margin:12px 0">${rows}</table>`;
}

function buildClientOrderEmail(order: OrderWithDetails, trackingUrl: string) {
  const { name } = getClientContact(order);
  const content = `
    <p>Bonjour <strong>${name}</strong>,</p>
    <p>Votre commande <strong>#${order.codeTicket}</strong> chez BRAIZ'UP a bien été initiée. 🎉</p>
    ${buildItemsTable(order)}
    <table style="width:100%;margin-top:12px">
      ${
        order.totalProducts !== undefined
          ? `<tr><td style="padding:4px 0">Sous-total</td><td style="text-align:right">${formatPrice(order.totalProducts)}</td></tr>`
          : ""
      }
      ${
        order.shippingFee !== undefined && order.shippingFee > 0
          ? `<tr><td style="padding:4px 0">Livraison</td><td style="text-align:right">${formatPrice(order.shippingFee)}</td></tr>`
          : ""
      }
      <tr><td style="padding:8px 0;border-top:2px solid #5C0A0A;font-weight:bold">Total</td><td style="border-top:2px solid #5C0A0A;text-align:right;font-weight:bold;color:#5C0A0A;font-size:16px">${formatPrice(order.totalAmount)}</td></tr>
    </table>
    ${order.paymentMethod ? `<p style="margin-top:16px">💳 Paiement : <strong>${PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}</strong></p>` : ""}
    <div style="margin:24px 0;padding:16px;background:#fbede3;border-radius:8px;text-align:center">
      <p style="margin:0 0 12px"><strong>Suivre ma commande en temps réel</strong></p>
      <a href="${trackingUrl}" style="display:inline-block;background:#5C0A0A;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">📍 Suivre la commande</a>
      <p style="margin:12px 0 0;font-size:11px;color:#7a4a37;word-break:break-all">${trackingUrl}</p>
    </div>
    <p>Nous vous remercions de votre confiance.</p>
    <p style="margin:0;color:#666">— L'équipe BRAIZ'UP</p>
  `;
  return emailWrapper(`Commande #${order.codeTicket} initiée`, content);
}

function buildAdminAlertEmail(order: OrderWithDetails, trackingUrl: string) {
  const { name, phone, email } = getClientContact(order);
  const content = `
    <p><strong>🔔 Nouvelle commande reçue !</strong></p>
    <table style="width:100%;margin:12px 0">
      <tr><td style="padding:6px 0;color:#666">N° Ticket</td><td style="text-align:right;font-weight:bold">${order.codeTicket}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Client</td><td style="text-align:right">${name}</td></tr>
      ${phone ? `<tr><td style="padding:6px 0;color:#666">Téléphone</td><td style="text-align:right">${phone}</td></tr>` : ""}
      ${email ? `<tr><td style="padding:6px 0;color:#666">Email</td><td style="text-align:right">${email}</td></tr>` : ""}
      ${order.shippingAddress ? `<tr><td style="padding:6px 0;color:#666">Adresse</td><td style="text-align:right">${order.shippingAddress}</td></tr>` : ""}
      ${order.proximityAddress ? `<tr><td style="padding:6px 0;color:#666">Point repère</td><td style="text-align:right">${order.proximityAddress}</td></tr>` : ""}
      <tr><td style="padding:8px 0;border-top:2px solid #5C0A0A;font-weight:bold">Montant total</td><td style="border-top:2px solid #5C0A0A;text-align:right;font-weight:bold;color:#5C0A0A">${formatPrice(order.totalAmount)}</td></tr>
    </table>
    ${buildItemsTable(order)}
    <div style="margin-top:20px;text-align:center">
      <a href="${trackingUrl}" style="display:inline-block;background:#5C0A0A;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Voir la commande</a>
    </div>
  `;
  return emailWrapper(`🆕 Nouvelle commande #${order.codeTicket}`, content);
}

function buildStatusChangeEmail(order: OrderWithDetails, newStatus: string, trackingUrl: string) {
  const { name } = getClientContact(order);
  const label = STATUS_LABELS[newStatus] ?? newStatus;
  const isFinal = newStatus === "LIVRÉE";
  const isCancelled = newStatus === "ANNULÉE";

  const content = `
    <p>Bonjour <strong>${name}</strong>,</p>
    <p>Votre commande <strong>#${order.codeTicket}</strong> ${isCancelled ? "a été annulée." : `vient de passer au statut :`}</p>
    <div style="margin:20px 0;padding:14px;background:${isCancelled ? "#fee2e2" : isFinal ? "#d4f2d8" : "#fbede3"};border-radius:8px;text-align:center">
      <span style="font-size:18px;font-weight:bold;color:${isCancelled ? "#b91c1c" : isFinal ? "#2f7a3a" : "#5C0A0A"}">${label}</span>
    </div>
    <div style="text-align:center;margin:20px 0">
      <a href="${trackingUrl}" style="display:inline-block;background:#5C0A0A;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Voir le détail</a>
    </div>
    <p style="color:#666">— BRAIZ'UP</p>
  `;
  return emailWrapper(`Commande #${order.codeTicket} — ${label}`, content);
}

// ────────────────────────────────────────────────────────────────────────
// Méthodes publiques
// ────────────────────────────────────────────────────────────────────────

/**
 * Notifie le client (email + WhatsApp si disponible) ET l'admin
 * qu'une commande vient d'être passée.
 */
export async function notifyOrderInitiated(order: OrderWithDetails) {
  try {
    const { email, phone, name } = getClientContact(order);
    const trackingUrl = buildTrackingUrl(order.trackingToken);

    // ─── Email client ────────────────────────────────────────────────
    if (email) {
      await sendEmail(
        email,
        `Votre commande #${order.codeTicket} chez BRAIZ'UP`,
        buildClientOrderEmail(order, trackingUrl),
      );
    }

    // ─── WhatsApp client (texte court) ───────────────────────────────
    if (phone && env.clientWhatsappApiKey) {
      const clientWaBody = `🍔 BRAIZ'UP — Commande #${order.codeTicket}\n\nBonjour ${name}, votre commande de ${formatPrice(order.totalAmount)} a bien été initiée.\n\n📍 Suivre votre commande :\n${trackingUrl}\n\nMerci !`;
      await sendWhatsApp(phone, env.clientWhatsappApiKey, clientWaBody);
    }

    // ─── Email admin ─────────────────────────────────────────────────
    if (env.adminEmail) {
      await sendEmail(
        env.adminEmail,
        `🆕 Nouvelle commande #${order.codeTicket} — ${formatPrice(order.totalAmount)}`,
        buildAdminAlertEmail(order, trackingUrl),
      );
    }

    // ─── WhatsApp admin ──────────────────────────────────────────────
    if (env.adminPhone && env.adminWhatsappApiKey) {
      const adminWaBody = `🔔 BRAIZ'UP — Nouvelle commande\n\n#${order.codeTicket}\nClient: ${name}${phone ? ` (${phone})` : ""}\nTotal: ${formatPrice(order.totalAmount)}\n\n📍 ${trackingUrl}`;
      await sendWhatsApp(env.adminPhone, env.adminWhatsappApiKey, adminWaBody);
    }
  } catch (err) {
    console.error("[notifyOrderInitiated] erreur (non bloquante) :", err);
  }
}

/**
 * Notifie le client d'un changement de statut (email + WhatsApp).
 */
export async function notifyStatusChanged(order: OrderWithDetails, newStatus: string) {
  try {
    const { email, phone, name } = getClientContact(order);
    const trackingUrl = buildTrackingUrl(order.trackingToken);
    const label = STATUS_LABELS[newStatus] ?? newStatus;

    if (email) {
      await sendEmail(
        email,
        `BRAIZ'UP — Commande #${order.codeTicket} : ${label}`,
        buildStatusChangeEmail(order, newStatus, trackingUrl),
      );
    }

    if (phone && env.clientWhatsappApiKey) {
      const body = `🍔 BRAIZ'UP\n\nBonjour ${name},\nVotre commande #${order.codeTicket} est désormais : *${label}*\n\n📍 ${trackingUrl}`;
      await sendWhatsApp(phone, env.clientWhatsappApiKey, body);
    }
  } catch (err) {
    console.error("[notifyStatusChanged] erreur (non bloquante) :", err);
  }
}

export default {
  notifyOrderInitiated,
  notifyStatusChanged,
};
