import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <img src={logo} alt="Levalt.tech logo" className="w-9 h-9 rounded-lg object-cover" />
            <span>levalt<span className="text-gradient">.tech</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === n.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 inline-flex items-center rounded-md bg-gradient-hero text-primary-foreground px-4 py-2 text-sm font-medium shadow-elegant hover:opacity-95 transition-smooth"
            >
              Book a demo
            </Link>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-border bg-secondary/40 mt-20">
        <div className="container mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <img src={logo} alt="Levalt.tech logo" className="w-8 h-8 rounded-lg object-cover" />
              levalt.tech
            </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Performance-driven contact centre and AI integration services for ambitious teams.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-foreground">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@levalt.tech</li>
              <li><Link to="/contact" className="hover:text-foreground">Get in touch →</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground flex justify-between">
            <span>© {new Date().getFullYear()} Levalt.tech. All rights reserved.</span>
            <span>Built for performance.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
