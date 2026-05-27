import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wadeal: {
          red: "#e53935",
          coral: "#ff6b4a",
          ink: "#111827",
          muted: "#6b7280",
          line: "#e5e7eb",
          kakao: "#fee500",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17, 24, 39, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
