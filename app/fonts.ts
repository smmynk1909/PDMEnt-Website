import { Outfit, IBM_Plex_Sans, Inconsolata } from "next/font/google";

// Self-hosted via next/font. Exposed as CSS variables that globals.css maps
// onto the --rm-font-* tokens so design/tokens.css stays the single source.
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inconsolata",
  display: "swap",
});
