"use client";
import { useMemo, useState } from "react";

/* GA helper — failsafe */
function gaEvent(name, params = {}) {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", name, params);
    }
  } catch {}
}

export default function ContactForm() {
  const [state, setState] = useState({ loading: false, ok: false, error: "" });
  const [justSent, setJustSent] = useState(false);
  const [toast, setToast] = useState({ show: false, text: "" });

  const waHref = useMemo(() => {
    const txt =
      "Hi Ovidiu, I just sent a quote request from ovidiu.it.com " +
      "(utm_source=site&utm_medium=cta&utm_campaign=quote).";
    return `https://wa.me/447892720676?text=${encodeURIComponent(txt)}`;
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ loading: true, ok: false, error: "" });

    const fd = new FormData(form);
    // honeypot
    fd.set("hp_field", "");
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setState({ loading: false, ok: true, error: "" });
        setJustSent(true);

        // GA4 events
        gaEvent("form_submit_success", {
          placement: "contact",
          service: payload.service || "(none)",
          budget: payload.budget || "(none)",
        });
        gaEvent("lead_submitted", {
          placement: "contact",
          service: payload.service || "(none)",
          budget: payload.budget || "(none)",
        });

        form.reset();

        // UX: “Sent ✓” ~1.4s
        setTimeout(() => setJustSent(false), 1400);

        // Toast 3s
        setToast({ show: true, text: "Request received — check your inbox ✅" });
        setTimeout(() => setToast({ show: false, text: "" }), 3000);
      } else {
        throw new Error(json?.error || "Submit failed");
      }
    } catch (err) {
      const msg = err?.message || "Error";
      setState({ loading: false, ok: false, error: msg });
      setToast({ show: true, text: "Something went wrong. Please try again." });
      setTimeout(() => setToast({ show: false, text: "" }), 3000);

      gaEvent("form_submit_error", { placement: "contact" });
      gaEvent("lead_submit_failed", { placement: "contact" });
    }
  }

  const fieldClasses =
    "input w-full bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[var(--accent)]";

  return (
    <div className="relative">
      {/* Toast */}
      {toast.show && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed right-4 bottom-24 z-[60] max-w-sm rounded-xl border border-white/10 bg-zinc-900/95 px-4 py-3 text-sm text-white shadow-xl backdrop-blur"
        >
          {toast.text}
        </div>
      )}

      <form
        id="quote"
        onSubmit={onSubmit}
        action="/api/contact"
        method="POST"
        className="card p-6 md:p-8 space-y-5"
      >
        <h2 className="text-xl font-bold">Request a price quote</h2>

        {/* Success banner + quick CTAs */}
        {state.ok && (
          <div>
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-200"
            >
              Thanks — your request was sent. I’ll get back to you shortly.
            </div>
            <div className="flex gap-2 pt-2">
              <a href="/projects" className="btn-ghost">
                View Projects
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                onClick={() =>
                  gaEvent("cta_whatsapp_click", { placement: "contact" })
                }
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Error banner */}
        {state.error && (
          <div
            role="alert"
            className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-rose-200"
          >
            {state.error}. Please try again.
          </div>
        )}

        {/* HONEYPOT (anti-spam) */}
        <input
          type="text"
          name="hp_check"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* GRID fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={fieldClasses}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={fieldClasses}
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="service">
              Service
            </label>
            <select
              id="service"
              name="service"
              className={fieldClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a service…
              </option>
              <option value="Website">Website (Next.js)</option>
              <option value="SEO">SEO</option>
              <option value="Automation">Automation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="budget">
              Budget
            </label>
            <select
              id="budget"
              name="budget"
              className={fieldClasses}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a range…
              </option>
              <option value="Under £1,000">Under £1,000</option>
              <option value="£1,000 – £3,000">£1,000 – £3,000</option>
              <option value="£3,000 – £8,000">£3,000 – £8,000</option>
              <option value="Over £8,000">Over £8,000</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1" htmlFor="website">
              Current website (optional)
            </label>
            <input
              id="website"
              name="website"
              type="url"
              className={fieldClasses}
              placeholder="https://example.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1" htmlFor="message">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              className={fieldClasses}
              rows={6}
              placeholder="Tell me about your goals, timeline, must-haves…"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="btn-primary"
            disabled={state.loading}
            data-ga-event="cta_click"
            data-ga-params='{"label":"Send quote request","section":"contact"}'
          >
            {state.loading
              ? "Sending…"
              : justSent
              ? "Sent ✓"
              : "Send request"}
          </button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() =>
              gaEvent("cta_whatsapp_click", { placement: "contact" })
            }
          >
            Chat on WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
