import type { Metadata } from "next";
import "../design/tokens.css";
import "./globals.css";
import { outfit, plexSans, inconsolata } from "./fonts";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { BagDrawer } from "@/components/commerce/BagDrawer";
import { SearchOverlay } from "@/components/nav/SearchOverlay";
import { Toast } from "@/components/ui/Toast";
import { CartHydrator } from "@/components/commerce/CartHydrator";

export const metadata: Metadata = {
  title: {
    default: "Roots and Mills — Dakshya · Prateet · Soma",
    template: "%s — Roots and Mills",
  },
  description:
    "Roots and Mills, a brand of PDM Enterprises. Masalas, flour, coffee, tea and oil — Mastery, Trust, Calm. Dummy mill lots for website view.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plexSans.variable} ${inconsolata.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <CartHydrator />
        <GlobalNav />
        <main id="main">{children}</main>
        <Footer />
        <BagDrawer />
        <SearchOverlay />
        <Toast />
      </body>
    </html>
  );
}
