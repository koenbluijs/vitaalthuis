import type { Config } from "tailwindcss";

/**
 * Tokens leven als CSS-variabelen in app/globals.css (:root en .dark).
 * Tailwind verwijst hier alleen naar die variabelen, zodat light, dark en
 * de "meer contrast"-modus automatisch doorwerken. Zie Fase 4 stijlgids.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        focus: "var(--color-focus)",
        primary: "var(--color-primary)",
        "primary-strong": "var(--color-primary-strong)",
        "on-primary": "var(--color-on-primary)",
        accent: "var(--color-accent)",
        "accent-text": "var(--color-accent-text)",
        "on-accent": "var(--color-on-accent)",
        info: "var(--color-info)",
        "info-surface": "var(--color-info-surface)",
        "on-info-surface": "var(--color-on-info-surface)",
        caution: "var(--color-caution)",
        "caution-surface": "var(--color-caution-surface)",
        "on-caution-surface": "var(--color-on-caution-surface)",
        stop: "var(--color-stop)",
        "stop-surface": "var(--color-stop-surface)",
        "on-stop-surface": "var(--color-on-stop-surface)",
        "on-stop": "var(--color-on-stop)",
        success: "var(--color-success)",
        "success-surface": "var(--color-success-surface)",
        "on-success-surface": "var(--color-on-success-surface)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(43,42,38,0.06), 0 2px 8px rgba(43,42,38,0.06)",
        lift: "0 4px 16px rgba(43,42,38,0.10)",
      },
      maxWidth: {
        app: "30rem", // ~480px mobiele containerbreedte
      },
    },
  },
  plugins: [],
};

export default config;
