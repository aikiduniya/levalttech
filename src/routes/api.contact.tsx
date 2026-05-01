import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().default(""),
  service: z.string().trim().max(100).optional().default("General"),
  message: z.string().trim().min(1).max(5000),
});

const SMTP_HOST = "smtp.hostinger.com";
const SMTP_PORT = 465;
const SMTP_USER = "support@levalt.tech";
const ADMIN_EMAIL = "support@levalt.tech";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = ContactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
          }
          const { name, email, company, service, message } = parsed.data;

          const password = process.env.SMTP_PASSWORD;
          if (!password) {
            return Response.json({ error: "Email service not configured" }, { status: 500 });
          }

          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: true,
            auth: { user: SMTP_USER, pass: password },
          });

          const safe = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            company: escapeHtml(company || "—"),
            service: escapeHtml(service || "—"),
            message: escapeHtml(message).replace(/\n/g, "<br/>"),
          };

          // 1) Email to admin
          const adminHtml = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;color:#111;">
              <h2 style="color:#5b3df5;margin:0 0 16px;">New contact enquiry — Levalt.tech</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td><strong>${safe.name}</strong></td></tr>
                <tr><td style="padding:8px 0;color:#666;">Email</td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#666;">Company</td><td>${safe.company}</td></tr>
                <tr><td style="padding:8px 0;color:#666;">Service</td><td>${safe.service}</td></tr>
              </table>
              <h3 style="margin:24px 0 8px;font-size:15px;">Message</h3>
              <div style="padding:16px;background:#f6f6fb;border-radius:8px;font-size:14px;line-height:1.6;">${safe.message}</div>
              <p style="margin-top:24px;font-size:12px;color:#999;">Sent from levalt.tech contact form</p>
            </div>`;

          await transporter.sendMail({
            from: `"Levalt.tech Website" <${SMTP_USER}>`,
            to: ADMIN_EMAIL,
            replyTo: email,
            subject: `New enquiry from ${name} — ${service}`,
            html: adminHtml,
          });

          // 2) Auto-reply to customer
          const replyHtml = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;color:#111;">
              <h2 style="color:#5b3df5;margin:0 0 12px;">Thanks for reaching out, ${safe.name}!</h2>
              <p style="font-size:14px;line-height:1.6;color:#333;">
                We've received your message and a member of the Levalt.tech team will get back to you within one business day.
              </p>
              <p style="font-size:14px;line-height:1.6;color:#333;">Here's a copy of what you sent us:</p>
              <div style="padding:16px;background:#f6f6fb;border-radius:8px;font-size:14px;line-height:1.6;color:#444;">
                <strong>Service:</strong> ${safe.service}<br/><br/>${safe.message}
              </div>
              <p style="font-size:14px;line-height:1.6;color:#333;margin-top:20px;">
                In the meantime, feel free to explore our <a href="https://levalt.tech/services" style="color:#5b3df5;">services</a>
                or check out the <a href="https://levalt.tech/faq" style="color:#5b3df5;">FAQ</a>.
              </p>
              <p style="font-size:14px;line-height:1.6;margin-top:24px;">— The Levalt.tech Team</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
              <p style="font-size:12px;color:#999;">Levalt.tech · support@levalt.tech</p>
            </div>`;

          await transporter.sendMail({
            from: `"Levalt.tech" <${SMTP_USER}>`,
            to: email,
            subject: "We received your message — Levalt.tech",
            html: replyHtml,
          });

          return Response.json({ ok: true });
        } catch (err: any) {
          console.error("Contact form error:", err);
          return Response.json({ error: "Failed to send message" }, { status: 500 });
        }
      },
    },
  },
});
