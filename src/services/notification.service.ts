/**
 * Service de notifications (Email + WhatsApp)
 * ────────────────────────────────────────────
 * Pour l'instant : stubs avec console.log.
 * Pour activer en production :
 *   - Email : installer `nodemailer` puis remplacer sendEmail()
 *   - WhatsApp : installer `twilio` (ou Whatsapp Cloud API) puis remplacer sendWhatsApp()
 *
 * Les fonctions ne lèvent jamais — un échec d'envoi ne doit pas bloquer la commande.
 */

import type { Order } from "@prisma/client";

interface OrderWithDetails {
  id: number;
  codeTicket: string;
  trackingToken: string;
  totalAmount: number;
  status: string;
  guestName?: string | null;
  guestSurname?: string | null;
  guestPhone?: string | null;
  guestEmail?: string | null;
  user?: { firstName?: string | null; lastName?: string | null; email?: string | null; phoneNumber?: string | null } | null;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@braizup.com";
const ADMIN_PHONE = process.env.ADMIN_PHONE ?? "+237655032026";
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";

function buildTrackingUrl(token: string) {
  return `${FRONTEND_URL}/tracking/${token}`;
}

function getClientContact(order: OrderWithDetails) {
  const email = order.user?.email ?? order.guestEmail ?? null;
  const phone = order.user?.phoneNumber ?? order.guestPhone ?? null;
  const name =
    order.user?.firstName
      ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}`.trim()
      : `${order.guestName ?? ""} ${order.guestSurname ?? ""}`.trim() || "Client";
  return { email, phone, name };
}

// ── Méthodes bas niveau (à remplacer par nodemailer / twilio en prod) ─────
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`📧 [EMAIL → ${to}] ${subject}\n${body}\n`);
  // TODO : remplacer par nodemailer
  // await transporter.sendMail({ from, to, subject, html: body });
}

async function sendWhatsApp(toPhone: string, body: string) {
  console.log(`📱 [WHATSAPP → ${toPhone}]\n${body}\n`);
  // TODO : remplacer par twilio ou WhatsApp Cloud API
  // await twilio.messages.create({ from: "whatsapp:+...", to: `whatsapp:${toPhone}`, body });
}

// ── Méthodes publiques ────────────────────────────────────────────────────

/**
 * Notifie le client + l'admin qu'une commande vient d'être passée.
 * Ne lève jamais — on log les erreurs et on continue.
 */
export async function notifyOrderInitiated(order: OrderWithDetails) {
  try {
    const { email, phone, name } = getClientContact(order);
    const trackingUrl = buildTrackingUrl(order.trackingToken);

    const clientBody = `
Bonjour ${name},

Votre commande #${order.codeTicket} chez BRAIZ'UP a bien été initiée.
Montant total : ${order.totalAmount.toLocaleString("fr-FR")} FCFA

Vous pouvez suivre l'avancement de votre commande ici :
${trackingUrl}

Merci de votre confiance !
— L'équipe BRAIZ'UP
`.trim();

    if (email) await sendEmail(email, `Commande #${order.codeTicket} initiée`, clientBody);
    if (phone) await sendWhatsApp(phone, clientBody);

    // Notif admin
    const adminBody = `
🔔 Nouvelle commande #${order.codeTicket}
Client : ${name}${phone ? ` (${phone})` : ""}
Total : ${order.totalAmount.toLocaleString("fr-FR")} FCFA
Tracking : ${trackingUrl}
`.trim();

    await sendEmail(ADMIN_EMAIL, `🆕 Nouvelle commande #${order.codeTicket}`, adminBody);
    await sendWhatsApp(ADMIN_PHONE, adminBody);
  } catch (err) {
    console.error("[notifyOrderInitiated] erreur (non bloquante) :", err);
  }
}

/**
 * Notifie le client d'un changement de statut.
 */
export async function notifyStatusChanged(order: OrderWithDetails, newStatus: string) {
  try {
    const { email, phone, name } = getClientContact(order);
    const trackingUrl = buildTrackingUrl(order.trackingToken);

    const STATUS_LABELS: Record<string, string> = {
      EN_PRECOMMANDE: "Précommande",
      EN_COURS_DE_PREPARATION: "En cours de préparation",
      "PRÊTE": "Prête",
      EN_LIVRAISON: "En livraison",
      "LIVRÉE": "Livrée",
      "ANNULÉE": "Annulée",
    };

    const body = `
Bonjour ${name},

Votre commande #${order.codeTicket} a changé de statut :
👉 ${STATUS_LABELS[newStatus] ?? newStatus}

Suivez le détail ici : ${trackingUrl}

— BRAIZ'UP
`.trim();

    if (email) await sendEmail(email, `Commande #${order.codeTicket} — ${STATUS_LABELS[newStatus] ?? newStatus}`, body);
    if (phone) await sendWhatsApp(phone, body);
  } catch (err) {
    console.error("[notifyStatusChanged] erreur (non bloquante) :", err);
  }
}

export default {
  notifyOrderInitiated,
  notifyStatusChanged,
};
