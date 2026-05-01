import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Target, Users, Lightbulb, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Us — Levalt.tech",
      description:
        "Learn about Levalt.tech — a contact centre and AI integration partner helping ambitious teams increase talk-time, conversion and operational excellence.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="bg-gradient-subtle border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Levalt.tech</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We build the dialling engines and AI layers behind high-performing contact centres —
            with cleaner deployments, stronger compliance and measurable results.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16 space-y-6 text-foreground/80">
        <p>
          Levalt.tech was founded on a simple idea: contact centre technology should help teams
          talk to more people, in better conversations, with the controls operators actually need.
          Too many platforms force a trade-off between performance and governance — we don't.
        </p>
        <p>
          Our flagship 626Dialler platform combines predictive dialling with built-in compliance
          guardrails, while our AI Integration service operationalises modern intelligence
          — transcription, sentiment, agent-assist — across the systems your team already uses.
        </p>
      </section>

      <section className="bg-secondary/30 border-y border-border py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center">What drives us</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[
              { i: Target, t: "Outcomes first", d: "Every feature we ship is measured against contact rate, conversion or efficiency." },
              { i: Users, t: "Operator-led", d: "Designed with input from supervisors, QA leads and frontline agents." },
              { i: Lightbulb, t: "Pragmatic AI", d: "We deploy intelligence where it pays back — not as a buzzword." },
              { i: Award, t: "Compliance always", d: "Consent, DNC and audit are baked in, not bolted on." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <Icon className="text-primary" size={22} />
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Let's build your next campaign</h2>
        <p className="mt-3 text-muted-foreground">
          Whether you're modernising a dialler stack or operationalising AI, we'd love to help.
        </p>
        <Link to="/contact" className="mt-6 inline-flex rounded-md bg-gradient-hero text-primary-foreground px-6 py-3 font-medium shadow-elegant">
          Get in touch
        </Link>
      </section>
    </div>
  );
}
