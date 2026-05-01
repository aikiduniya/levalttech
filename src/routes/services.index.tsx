import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SERVICES } from "@/lib/services-data";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Services — Levalt.tech | Dialler & AI Integration",
      description:
        "Explore Levalt.tech services: 626Dialler predictive dialling platform and end-to-end AI Integration for contact centres and modern operations.",
      path: "/services",
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div>
      <section className="bg-gradient-subtle border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our services</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Two focused offerings, both engineered to deliver measurable impact across your contact centre operation.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
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
              <h2 className="mt-5 text-2xl font-bold">{s.name}</h2>
              <p className="mt-2 text-muted-foreground">{s.tagline}</p>
              <ul className="mt-5 space-y-2">
                {s.badges.map((b) => (
                  <li key={b} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                View details <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
