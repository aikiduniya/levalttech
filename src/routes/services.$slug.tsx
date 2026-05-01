import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SERVICES } from "@/lib/services-data";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return seo({ title: "Service — Levalt.tech", description: "Levalt.tech services.", path: "/services" });
    return seo({
      title: `${s.name} — Levalt.tech`,
      description: s.tagline + " " + s.hero.slice(0, 100),
      path: `/services/${s.slug}`,
    });
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="container mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Service not found</h1>
      <Link to="/services" className="mt-6 inline-flex text-primary">Back to services</Link>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();

  return (
    <div>
      <section className="bg-gradient-subtle border-b border-border">
        <div className="container mx-auto max-w-5xl px-4 py-20">
          <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground">← All services</Link>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">{service.name}</h1>
          <p className="mt-3 text-xl text-muted-foreground">{service.tagline}</p>
          <p className="mt-6 text-foreground/80 max-w-3xl">{service.hero}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-gradient-hero text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-elegant hover:opacity-95">
              Book a platform demo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {service.badges.map((b) => (
              <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-card border border-border">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {service.sections.map((sec, idx) => (
        <section key={sec.title} className={idx % 2 === 1 ? "bg-secondary/30 border-y border-border" : ""}>
          <div className="container mx-auto max-w-5xl px-4 py-16">
            <h2 className="text-3xl font-bold">{sec.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">{sec.intro}</p>
            <ul className="mt-8 grid md:grid-cols-2 gap-4">
              {sec.items.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="container mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center">Why {service.name.split(" ")[0]}</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {service.highlights.map((h) => (
            <div key={h.title} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-foreground/80">{service.closing}</p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-hero text-primary-foreground px-6 py-3 font-medium shadow-elegant hover:opacity-95">
          Get started <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
