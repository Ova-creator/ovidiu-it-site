import { NextResponse } from "next/server";
import { transporter, sendAutoReply, sendOwnerNotice } from "@/lib/mail";
import { canSendAutoReply } from "@/lib/ratelimit";
import { renderAutoReplyHTML, renderAutoReplyText } from "@/lib/email-templates";

export const runtime = "nodejs";

const OWNER_INBOX = process.env.CONTACT_INBOX || "digital@ovidiu.it.com";

function isEmail(x = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export async function POST(req) {
  try {
    // Acceptă JSON și FormData
    const ct = req.headers.get("content-type") || "";
    let data = {};
    if (ct.includes("application/json")) {
      data = await req.json().catch(() => ({}));
    } else if (
      ct.includes("application/x-www-form-urlencoded") ||
      ct.includes("multipart/form-data")
    ) {
      const fd = await req.formData();
      data = Object.fromEntries(fd.entries());
    } else {
      data = await req.json().catch(() => ({}));
    }

    const {
      name = "",
      email = "",
      service = "",
      complexity = "",
      budget = "",
      message = "",
      hp_field = "",
    } = data || {};

    // Honeypot → mimăm succesul
    if (hp_field) {
      const wantsJSON = ct.includes("application/json");
      if (!wantsJSON) {
        return NextResponse.redirect(new URL("/thank-you", req.url), 303);
      }
      return NextResponse.json({ ok: true, bot: true });
    }

    // Validare minimă
    if (!isEmail(email) || !message) {
      return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 });
    }

    // Mail către tine
    const subject = `New quote request — ${service || "General"} (${budget || "n/a"})`;
    const ownerHtml = `
      <div style="font-family:Inter,Arial,sans-serif;font-size:14px;">
        <h2 style="margin:0 0 8px;">New request</h2>
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "-"}</p>
        <p><strong>Complexity:</strong> ${complexity || "-"}</p>
        <p><strong>Budget:</strong> ${budget || "-"}</p>
        <p><strong>Message:</strong><br>${(message || "").replace(/\n/g, "<br>")}</p>
      </div>
    `;
    await sendOwnerNotice({
      to: OWNER_INBOX,
      subject,
      html: ownerHtml,
      text:
        `New request\n` +
        `Name: ${name || "-"}\nEmail: ${email}\nService: ${service || "-"}\n` +
        `Complexity: ${complexity || "-"}\nBudget: ${budget || "-"}\n\nMessage:\n${message || "-"}`,
    });

    // Autoresponder (rate-limited)
    if (canSendAutoReply(email)) {
      const html = renderAutoReplyHTML({ name, service, complexity, budget, message });
      const text = renderAutoReplyText({ name, service, complexity, budget, message });
      await sendAutoReply({ to: email, html, text });
    }

    // Fallback fără JS → redirect frumos
    const wantsJSON = ct.includes("application/json");
    if (!wantsJSON) {
      return NextResponse.redirect(new URL("/thank-you", req.url), 303);
    }

    // AJAX → răspuns JSON
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
