import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder palette ported from the old site tokens. Swap to the
        // confirmed brand palette once the client approves logo/colours.
        cream: "#FBF4E6",
        paper: "#F6EBD1",
        ink: "#1F1B16",
        inkSoft: "#5B4E3F",
        red: "#B6322B",
        brown: "#6B3A1D",
        yellow: "#E8A530",
        green: "#3D6A2E",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      maxWidth: {
        wrap: "72rem",
      },
    },
  },
  plugins: [typography],
};

export default config;
