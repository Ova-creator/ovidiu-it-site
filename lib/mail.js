// lib/mail.js
import nodemailer from "nodemailer";

const ZOHO_USER = process.env.ZOHO_USER || process.env.CONTACT_INBOX; // fallback safe
const ZOHO_PASS = process.env.ZOHO_PASS; // App Password (nu parola normală!)
const FROM_NAME = process.env.MAIL_FROM_NAME || "Ovidiu.IT";
const OWNER_INBOX = process.env.CONTACT_INBOX || "digital@ovidiu.it.com";

// mic guard ca să vezi rapid în Vercel Logs dacă lipsesc variabile
function assertEnv() {
  if (!ZOHO_USER) throw new Error("Missing ZOHO_USER/CONTACT_INBOX");
  if (!ZOHO_PASS) throw new Error("Missing ZOHO_PASS (Zoho App Password)");
}

let _transporter = null;

export function transporter() {
  if (_transporter) return _transporter;
  assertEnv();

  _transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu", // pentru conturi EU
    port: 465,
    secure: true,
    auth: { user: ZOHO_USER, pass: ZOHO_PASS },
    pool: true,
    maxConnections: 3,
    maxMessages: 10,
  });

  return _transporter;
}

async function sendMail({ to, subject = "", html, text }) {
  const tx = transporter();
  return tx.sendMail({
    from: `"${FROM_NAME}" <${ZOHO_USER}>`,
    to,
    subject,
    html,
    text,
    replyTo: OWNER_INBOX,
  });
}

// păstrăm exact aceleași exporturi pe care le imporți în route.js
export async function sendOwnerNotice({ to, subject, html, text }) {
  return sendMail({
    to: to || OWNER_INBOX,
    subject: subject || "New Contact Request",
    html,
    text,
  });
}

export async function sendAutoReply({ to, html, text }) {
  return sendMail({
    to,
    subject: "Thanks for reaching out — Ovidiu.IT",
    html,
    text,
  });
}
