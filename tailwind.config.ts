/**
 * tailwind.config.ts
 *
 * ⚡ CENTRALIZED THEME — ONE PLACE TO RULE THEM ALL
 * ─────────────────────────────────────────────────────────────────────────────
 * All design tokens (colors, fonts, shadows, animations) live here.
 * Change a value once → it updates across the ENTIRE project.
 *
 * NEVER hardcode colors in components. Always use semantic Tailwind tokens:
 *   bg-primary        text-text-primary     border-border
 *   bg-surface        text-text-muted       text-error
 *   hover:bg-primary-hover                  text-success
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Config } from 'tailwindcss';

// ─── Raw Color Palette ────────────────────────────────────────────────────────
// Internal palette — not used in components directly. Used to build semantic tokens below.

const palette = {
  // Brand
  indigo: {
    50: '#f2ffeeff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',  // Primary brand
    600: '#4f46e5',  // Primary hover
    700: '#4338ca',  // Primary active
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Accent
  violet: {
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
  },

  // Neutrals — surfaces, text, borders
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    850: '#172033',
    900: '#0f172a',
    950: '#020617',
  },

  // Semantic status colors
  green: { 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
  yellow: { 400: '#facc15', 500: '#eab308', 600: '#ca8a04' },
  red: { 400: '#f87171', 500: '#ef4444', 600: '#dc2626' },
  orange: { 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
  cyan: { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' },

  white: '#ffffff',
  black: '#000000',
} as const;

// ─── Semantic Color Tokens ────────────────────────────────────────────────────
// These map to Tailwind classes: bg-primary, text-error, border-border, etc.
// ⚡ To rebrand: change the values below — components need zero changes.

const colors = {
  // ── Brand / Primary ────────────────────────────────────────────────────────
  primary: palette.indigo[500],
  'primary-hover': palette.indigo[600],
  'primary-active': palette.indigo[700],
  'primary-subtle': palette.indigo[50],
  'primary-foreground': palette.white,

  // ── Secondary ──────────────────────────────────────────────────────────────
  secondary: palette.violet[500],
  'secondary-hover': palette.violet[600],
  'secondary-active': palette.violet[700],

  // ── Surfaces & Backgrounds ─────────────────────────────────────────────────
  background: palette.slate[950],   // Page background (darkest)
  surface: palette.slate[900],   // Card / panel background
  'surface-hover': palette.slate[800],   // Interactive surface on hover
  'surface-muted': palette.slate[850],   // Disabled / muted surface

  // ── Text ───────────────────────────────────────────────────────────────────
  'text-primary': palette.slate[50],    // Main readable text
  'text-secondary': palette.slate[300],   // Subdued / secondary text
  'text-muted': palette.slate[500],   // Placeholders, hints, labels
  'text-disabled': palette.slate[600],   // Disabled state text
  'text-inverse': palette.slate[950],   // Text on light backgrounds

  // ── Borders ────────────────────────────────────────────────────────────────
  border: palette.slate[700],
  'border-hover': palette.slate[500],
  'border-focus': palette.indigo[500],

  // ── Status / Semantic ──────────────────────────────────────────────────────
  success: palette.green[500],
  'success-subtle': palette.green[400],
  warning: palette.yellow[500],
  'warning-subtle': palette.yellow[400],
  error: palette.red[500],
  'error-subtle': palette.red[400],
  info: palette.cyan[500],
  'info-subtle': palette.cyan[400],
};

// ─── Typography ───────────────────────────────────────────────────────────────

const fontFamily = {
  sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
};

// ─── Border Radius ────────────────────────────────────────────────────────────

const borderRadius = {
  none: '0px',
  sm: '4px',
  DEFAULT: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

// ─── Box Shadows ──────────────────────────────────────────────────────────────

const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  DEFAULT: '0 2px 8px 0 rgb(0 0 0 / 0.4)',
  md: '0 4px 16px 0 rgb(0 0 0 / 0.4)',
  lg: '0 8px 32px 0 rgb(0 0 0 / 0.5)',
  xl: '0 16px 48px 0 rgb(0 0 0 / 0.5)',
  glow: `0 0 20px 0 ${palette.indigo[500]}40`,  // Indigo glow effect
  none: 'none',
};

// ─── Animations ───────────────────────────────────────────────────────────────

const animation = {
  'fade-in': 'fadeIn 0.2s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'zoom-in': 'zoomIn 0.2s ease-out',
};

const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  slideUp: {
    from: { transform: 'translateY(8px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideDown: {
    from: { transform: 'translateY(-8px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  zoomIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
};

// ─── Tailwind Config ──────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/domain/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      borderRadius,
      boxShadow,
      animation,
      keyframes,
    },
  },
  plugins: [],
};

export default config;
