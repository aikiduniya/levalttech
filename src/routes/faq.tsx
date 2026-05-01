import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: "FAQ — Levalt.tech",
      description:
        "Frequently asked questions about Levalt.tech services — 626Dialler predictive dialling and AI integration for contact centres.",
      path: "/faq",
    }),
  component: FAQ,
});

const faqs = [
  {
    q: "What is the 626Dialler platform?",
    a: "626Dialler is a complete outbound and blended contact centre platform. It supports predictive, progressive, preview and manual dial modes with adaptive pacing, supervisor controls, CRM integrations and built-in compliance guardrails.",
  },
  {
    q: "How does Levalt's AI Integration service work?",
    a: "We layer real-time transcription, sentiment, intent detection and agent-assist on top of your existing telephony, CRM and dialler — using OpenAI, Azure OpenAI, Anthropic or custom models tuned to your scripts and KPIs.",
  },
  {
    q: "Which telephony systems are supported?",
    a: "626Dialler is SIP-compatible and works with major cloud telephony providers. We support failover routing and resilient call delivery across providers so your campaigns stay live.",
  },
  {
    q: "Which CRMs and business systems integrate?",
    a: "Out-of-the-box integrations with Salesforce, HubSpot and Microsoft Dynamics, plus custom API and webhook integrations for any system that exposes a modern interface.",
  },
  {
    q: "How is compliance handled?",
    a: "Consent-aware workflows, Do-Not-Call enforcement, abandoned-call thresholds, recording controls, role-based permissions and audit logs are built into the platform — not bolted on.",
  },
  {
    q: "How long does deployment take?",
    a: "Most teams go live within a few weeks. Cleaner integration paths and a focused feature set mean faster onboarding compared to legacy enterprise platforms.",
  },
  {
    q: "Can AI replace my agents?",
    a: "No — and we don't think it should. Our AI integration is built to augment agents with real-time prompts, summaries and QA automation, freeing humans to handle the conversations that close.",
  },
  {
    q: "How do I get started?",
    a: "Send us a message via the contact page. We'll book a discovery call, scope your operation and propose the fastest path to measurable lift.",
  },
];

function FAQ() {
  return (
    <div>
      <section className="bg-gradient-subtle border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Frequently asked questions</h1>
          <p className="mt-4 text-muted-foreground">Quick answers about our platform, integrations and approach.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="font-semibold">{q}</span>
        {open ? <Minus size={18} className="text-primary flex-shrink-0" /> : <Plus size={18} className="text-primary flex-shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
