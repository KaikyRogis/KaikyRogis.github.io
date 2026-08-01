import type { Metadata } from "next";
import { PortfolioPage } from "../page";

export const metadata: Metadata = {
  title: "Kaiky Rogis | Systems and Automation Developer",
  description:
    "Kaiky Rogis' portfolio: systems, automation, databases, technical support and digital products.",
  keywords: [
    "Kaiky Rogis",
    "systems developer",
    "automation",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "SintegraPro",
    "OminiSafety",
  ],
  alternates: {
    canonical: "/en/",
    languages: { "pt-BR": "/", en: "/en/" },
  },
  openGraph: {
    title: "Kaiky Rogis — Digital Systems",
    description:
      "I turn real problems into systems, automation and digital experiences.",
    url: "https://kaikyrogis.github.io/en/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaiky Rogis — Digital Systems",
    description: "Systems, automation and digital experiences.",
    images: ["/og.png"],
  },
};

export default function EnglishPortfolio() {
  return <PortfolioPage locale="en" />;
}
