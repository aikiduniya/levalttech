export type Service = {
  slug: string;
  name: string;
  tagline: string;
  hero: string;
  badges: string[];
  sections: { title: string; intro: string; items: string[] }[];
  highlights: { title: string; body: string }[];
  closing: string;
};

export const SERVICES: Service[] = [
  {
    slug: "626-dialer",
    name: "626Dialler Platform",
    tagline: "Predictive dialling built for performance, compliance and scale",
    hero:
      "626Dialler is a complete outbound and blended contact centre platform. Increase talk-time, improve conversion and keep every campaign tightly governed with the controls your operation needs.",
    badges: [
      "Predictive dialling modes",
      "Supervisor controls",
      "CRM integrations",
      "Live conversion dashboards",
      "Compliance guardrails",
    ],
    sections: [
      {
        title: "Dial smarter. Connect faster. Convert more.",
        intro:
          "Keep agents talking to real people with intelligent pacing, retry logic and campaign rules that adapt in real time.",
        items: [
          "Predictive, progressive, preview and manual dial modes",
          "Adaptive pacing to keep abandoned-call thresholds under control",
          "Automatic answering machine detection and smart retries",
          "Live campaign controls for supervisors and team leaders",
          "Priority routing by region, segment or skill set",
          "Built-in Do-Not-Call and consent-aware workflows",
        ],
      },
      {
        title: "Built to fit your telephony stack and business systems",
        intro:
          "Launch quickly with robust connectivity and clean integration paths across your platform ecosystem.",
        items: [
          "Cloud telephony with SIP trunk compatibility",
          "Failover routing and resilient call delivery",
          "Omnichannel workflows for voice, SMS and callback journeys",
          "Salesforce, HubSpot, Dynamics and custom API integrations",
          "Webhook events for real-time status and disposition updates",
          "Secure role-based permissions and audit logs",
        ],
      },
    ],
    highlights: [
      {
        title: "Campaign analytics in real time",
        body: "Track contact rate, conversion, average handle time and outcomes as campaigns run.",
      },
      {
        title: "QA and coaching workflows",
        body: "Use recordings, dispositions and performance views to improve scripts, pacing and team consistency.",
      },
      {
        title: "Built-in Contact Centre Intelligence",
        body: "Layer in AI transcription, sentiment and coaching signals where it creates the most value.",
      },
    ],
    closing:
      "From collections and renewals to outbound sales, 626Dialler gives your team the dialling engine, connectivity and insights to deliver consistently better results.",
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    tagline: "Operationalise AI across your contact centre and business workflows",
    hero:
      "Bring AI into the moments that matter — live conversations, post-call analysis, agent assistance and back-office automation. Our AI integration service plugs intelligence into your existing systems without disrupting them.",
    badges: [
      "Real-time transcription",
      "Sentiment & intent",
      "Agent assist",
      "Workflow automation",
      "Custom model integration",
    ],
    sections: [
      {
        title: "Smarter conversations, automatically",
        intro:
          "Layer AI into voice, chat and SMS to lift quality, compliance and conversion on every interaction.",
        items: [
          "Real-time speech-to-text with speaker diarisation",
          "Sentiment, intent and topic detection during the call",
          "Live agent-assist prompts and next-best-action suggestions",
          "Automatic call summaries and disposition tagging",
          "Compliance keyword and silence detection",
          "Multilingual support for global teams",
        ],
      },
      {
        title: "Connect AI to your stack — securely",
        intro:
          "We integrate cleanly with your CRM, dialler, telephony and data warehouse so AI insights land where work happens.",
        items: [
          "OpenAI, Azure OpenAI, Anthropic and custom model support",
          "CRM workflow triggers from AI-detected intents",
          "Webhook and API delivery of structured insights",
          "Role-based access and PII redaction in transcripts",
          "Audit logs and consent-aware recording controls",
          "Data residency and retention configured to your policy",
        ],
      },
    ],
    highlights: [
      {
        title: "Lift conversion with agent-assist",
        body: "Real-time prompts help agents respond consistently, handle objections and move conversations forward.",
      },
      {
        title: "Cut QA time dramatically",
        body: "Automated scoring, summaries and exception flags replace hours of manual call review.",
      },
      {
        title: "Tailored to your operation",
        body: "We tune prompts, models and integration patterns around your scripts, KPIs and tech stack.",
      },
    ],
    closing:
      "From discovery to deployment, our AI integration service delivers measurable lift in quality, efficiency and customer experience.",
  },
];
