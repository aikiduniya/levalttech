import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact — Levalt.tech | Get in Touch",
      description:
        "Contact Levalt.tech to discuss predictive dialling, AI integration or a custom contact centre solution. We respond within one business day.",
      path: "/contact",
    }),
  component: Contact,
});

const SERVICE_OPTIONS = ["626Dialler Platform", "AI Integration", "General enquiry"];

function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: SERVICE_OPTIONS[0], message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send");
      toast.success("Message sent! We'll be in touch shortly.");
      setForm({ name: "", email: "", company: "", service: SERVICE_OPTIONS[0], message: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div>
      <section className="bg-gradient-subtle border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Get in touch</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Tell us about your operation. We'll come back to you within one business day with next steps.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-16 grid md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <Mail className="text-primary" size={20} />
            <h3 className="mt-3 font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground mt-1">support@levalt.tech</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <MapPin className="text-primary" size={20} />
            <h3 className="mt-3 font-semibold">Response time</h3>
            <p className="text-sm text-muted-foreground mt-1">Within 1 business day, Mon–Fri.</p>
          </div>
        </aside>

        <form onSubmit={onSubmit} className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Name *">
              <input required value={form.name} onChange={onChange("name")} className={inputCls} placeholder="Jane Doe" />
            </Field>
            <Field label="Email *">
              <input required type="email" value={form.email} onChange={onChange("email")} className={inputCls} placeholder="jane@company.com" />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Company">
              <input value={form.company} onChange={onChange("company")} className={inputCls} placeholder="Acme Inc." />
            </Field>
            <Field label="Service">
              <select value={form.service} onChange={onChange("service")} className={inputCls}>
                {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Message *">
            <textarea required rows={5} value={form.message} onChange={onChange("message")} className={inputCls} placeholder="Tell us about your team, current stack and goals..." />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-hero text-primary-foreground px-6 py-3 font-medium shadow-elegant hover:opacity-95 disabled:opacity-60 transition-smooth"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
