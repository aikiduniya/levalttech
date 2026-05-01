const SITE = "https://levalt.tech";

export function seo(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Levalt.tech" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      ...(opts.image ? [{ property: "og:image", content: opts.image }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
