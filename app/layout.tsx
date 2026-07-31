import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaikyrogis.github.io"),
  title: "Kaiky Rogis | Desenvolvedor de Sistemas e Automação",
  description: "Portfólio de Kaiky Rogis: sistemas, automação, banco de dados, suporte técnico e produtos digitais.",
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
  return <html lang="pt-BR"><body>{children}</body></html>;
}
