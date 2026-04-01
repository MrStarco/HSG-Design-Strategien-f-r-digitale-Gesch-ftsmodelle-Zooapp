import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        zooGreen: "#2D5A27",
        zooEarth: "#C4813A",
        zooCream: "#F5F0E8",
        zooYellow: "#F5D547",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
} satisfies Config;
