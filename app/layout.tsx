import type { Metadata } from "next";
import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "DomainLert | Know before your domains lapse",
  description:
    "Domain expiry monitoring for agencies and teams that cannot afford a missed renewal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const storageKey = "domainlert-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(storageKey);
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const theme = saved === "dark" || saved === "light" ? saved : system;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`,
          }}
        />
      </head>
      <body>
        <div className="siteShell">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
