import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003"),
  title: {
    default: "CONTRASTE",
    template: "%s | CONTRASTE"
  },
  description: "Sal de la burbuja de tu algoritmo. Contrasta ideas virales con argumentos, evidencia científica, sesgos y fuentes.",
  applicationName: "CONTRASTE",
  keywords: ["pensamiento crítico", "evidencia científica", "redes sociales", "argumentos", "sesgos cognitivos"],
  authors: [{ name: "nat", url: "https://substack.com/@gardenat888" }],
  creator: "nat",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "CONTRASTE",
    title: "CONTRASTE",
    description: "Lo que tu algoritmo no te enseña: argumentos, evidencia y preguntas para mirar el otro lado."
  },
  twitter: {
    card: "summary_large_image",
    title: "CONTRASTE",
    description: "Ideas virales puestas a prueba con evidencia y argumentos de ambos lados."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
