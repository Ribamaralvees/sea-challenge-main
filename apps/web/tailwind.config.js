/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /**
       * Todos os tokens consomem as CSS Variables definidas em
       * `src/styles/globals.css` (:root). Assim existe UMA única
       * fonte da verdade para as cores em todo o projeto.
       */
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },
        sidebar: 'rgb(var(--color-sidebar) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          blue: 'rgb(var(--color-surface-blue) / <alpha-value>)',
          highlight: 'rgb(var(--color-step-active-bg) / <alpha-value>)',
        },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        step: {
          inactive: 'rgb(var(--color-step-inactive) / <alpha-value>)',
          icon: 'rgb(var(--color-step-inactive-icon) / <alpha-value>)',
        },
        outline: 'rgb(var(--color-outline) / <alpha-value>)',
        decorative: 'rgb(var(--color-decorative) / <alpha-value>)',
        content: {
          heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        panel: '18px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0, 0, 0, 0.06)',
        menu: '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      maxWidth: {
        shell: '1366px',
      },
    },
  },
  plugins: [],
}
