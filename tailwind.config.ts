import type { Config } from 'tailwindcss';

const colors = {
  primary: '#0f6e8c',
  'primary-hover': '#0d5f79',
  'primary-active': '#0a4f64',
  'primary-subtle': '#e8f6fb',
  'primary-foreground': '#ffffff',

  secondary: '#2f9e44',
  'secondary-hover': '#258238',
  'secondary-active': '#1f6a2f',

  background: '#f7f6f2',
  surface: '#fffdfa',
  'surface-hover': '#f8f5ef',
  'surface-muted': '#f1ede4',

  'text-primary': '#1f2937',
  'text-secondary': '#5f6b7a',
  'text-muted': '#8b98a7',
  'text-disabled': '#d1d5db',
  'text-inverse': '#ffffff',

  border: '#e7e1d6',
  'border-hover': '#d7cfbf',
  'border-focus': '#0f6e8c',

  success: '#2f9e44',
  'success-subtle': '#e8f9ed',
  warning: '#b7791f',
  'warning-subtle': '#fff5df',
  error: '#dc2626',
  'error-subtle': '#fee2e2',
  info: '#0f6e8c',
  'info-subtle': '#e8f6fb',
} as const;

const fontFamily = {
  sans: ['var(--font-inter)', 'Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
};

const borderRadius = {
  none: '0px',
  sm: '4px',
  DEFAULT: '8px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

const boxShadow = {
  sm: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
  DEFAULT: '0 2px 8px 0 rgb(15 23 42 / 0.06)',
  md: '0 8px 22px 0 rgb(15 23 42 / 0.08)',
  lg: '0 14px 34px 0 rgb(15 23 42 / 0.1)',
  xl: '0 24px 50px 0 rgb(15 23 42 / 0.12)',
  glow: '0 0 0 0 transparent',
  none: 'none',
};

const animation = {
  'fade-in': 'fadeIn 0.2s ease-in-out',
  'slide-up': 'slideUp 0.2s ease-out',
  'slide-down': 'slideDown 0.2s ease-out',
  'slide-in-right': 'slideInRight 0.22s ease-out',
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
  slideInRight: {
    from: { transform: 'translateX(18px)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  zoomIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
};

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
