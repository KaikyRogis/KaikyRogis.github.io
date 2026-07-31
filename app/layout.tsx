import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaikyrogis.github.io"),
  title: "Kaiky Rogis | Desenvolvedor de Sistemas e Automação",
  description: "Portfólio de Kaiky Rogis: sistemas, automação, banco de dados, suporte técnico e produtos digitais.",
  applicationName: "Kaiky Rogis — Digital Systems",
  authors: [{ name: "Kaiky Rogis", url: "https://kaikyrogis.github.io" }],
  creator: "Kaiky Rogis",
  keywords: ["Kaiky Rogis", "desenvolvedor de sistemas", "automação", "Next.js", "NestJS", "PostgreSQL", "SintegraPro", "OminiSafety"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Kaiky Rogis — Digital Systems",
    description: "Eu transformo problemas reais em sistemas, automações e experiências digitais.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kaiky Rogis — Digital Systems" }],
  },
  twitter: { card: "summary_large_image", title: "Kaiky Rogis — Digital Systems", description: "Sistemas, automação e experiências digitais.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kaiky Rogis Vieira de Jesus",
    alternateName: "Kaiky Rogis",
    url: "https://kaikyrogis.github.io",
    image: "https://kaikyrogis.github.io/kaiky-portrait.png",
    jobTitle: "Desenvolvedor de Sistemas e Analista de Sistemas",
    address: { "@type": "PostalAddress", addressLocality: "Coronel Fabriciano", addressRegion: "MG", addressCountry: "BR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Centro Universitário do Leste de Minas Gerais — UNILESTE" },
    sameAs: ["https://github.com/KaikyRogis", "https://linkedin.com/in/kaikyrogis"],
    knowsAbout: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Automação de processos", "Suporte técnico avançado"],
  };
  return <html lang="pt-BR"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></body></html>;
}
