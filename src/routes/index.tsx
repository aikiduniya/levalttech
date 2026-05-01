import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SERVICES } from "@/lib/services-data";
import { ArrowRight, Phone, Sparkles, ShieldCheck, BarChart3, Headphones, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Levalt.tech — Predictive Dialling & AI Integration Services",
      description:
        "Levalt.tech delivers performance-driven contact centre dialling and AI integration services. Increase talk-time, lift conversion and operationalise AI across your workflows.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(60%_60%_at_50%_0%,oklch(0.7_0.18_280/0.4),transparent)]" />
        <div className="container mx-auto max-w-6xl px-4 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground border border-border">
            <Sparkles size={14} /> Performance · Compliance · Scale
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            Smarter conversations.
            <br />
            <span className="text-gradient">Better outcomes.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Levalt.tech builds the dialling engines and AI layers that modern contact centres rely on —
            engineered for talk-time, conversion and compliance from day one.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-hero text-primary-foreground px-6 py-3 font-medium shadow-elegant hover:opacity-95 transition-smooth"
            >
              Book a demo <ArrowRight size={16} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 font-medium hover:bg-muted transition-smooth"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "3×", l: "More talk-time per agent" },
            { v: "40%", l: "Faster QA cycles with AI" },
            { v: "99.9%", l: "Platform uptime" },
            { v: "24/7", l: "Implementation support" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
              <div className="text-3xl font-bold text-gradient">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What we deliver</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Two flagship services designed to transform how your team connects, converts and scales.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-elegant transition-smooth"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center text-primary-foreground shadow-elegant">
                {i === 0 ? <Phone size={22} /> : <Sparkles size={22} />}
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.badges.slice(0, 3).map((b) => (
                  <span key={b} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/40 border-y border-border py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why teams choose Levalt</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: "Compliance built-in", d: "Consent, DNC and audit controls embedded across every workflow." },
              { icon: BarChart3, t: "Measurable performance", d: "Live dashboards show contact rate, conversion and handle time as they happen." },
              { icon: Zap, t: "Fast deployment", d: "Cleaner stacks and clear integration paths get you live in weeks, not quarters." },
              { icon: Headphones, t: "Human + AI", d: "AI augments agents — it doesn't replace the conversations that close." },
              { icon: Phone, t: "Telephony agnostic", d: "SIP-compatible with failover routing across providers." },
              { icon: Sparkles, t: "Tailored intelligence", d: "Models, prompts and triggers tuned to your scripts and KPIs." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <Icon className="text-primary" size={22} />
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to lift performance?</h2>
        <p className="mt-3 text-muted-foreground">
          Tell us about your operation and we'll show you exactly how Levalt fits in.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-hero text-primary-foreground px-6 py-3 font-medium shadow-elegant hover:opacity-95 transition-smooth"
        >
          Talk to our team <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
