import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Levalt.tech" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Levalt.tech" },
      { property: "og:locale", content: "en_US" },
      { title: "Levalt Connect" },
      { property: "og:title", content: "Levalt Connect" },
      { name: "twitter:title", content: "Levalt Connect" },
      { name: "description", content: "Levalt Connect is a service-focused website showcasing 626Dialler and AI integration solutions." },
      { property: "og:description", content: "Levalt Connect is a service-focused website showcasing 626Dialler and AI integration solutions." },
      { name: "twitter:description", content: "Levalt Connect is a service-focused website showcasing 626Dialler and AI integration solutions." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f614f978-2f15-4638-9eeb-d6a5335a60aa/id-preview-7bf01b41--376ce436-c986-4007-a5d1-63f4072e0a49.lovable.app-1777619496805.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f614f978-2f15-4638-9eeb-d6a5335a60aa/id-preview-7bf01b41--376ce436-c986-4007-a5d1-63f4072e0a49.lovable.app-1777619496805.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <SiteLayout />
      <Toaster richColors position="top-right" />
    </>
  );
}
