import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F7B8A',
          hover: '#0B6570',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#CE1126',
          foreground: '#FFFFFF',
        },
        warm: {
          DEFAULT: '#FCD116',
          foreground: '#1A1A1A',
        },
        swiss: '#FF0000',
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#6B7280',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F8F9FA',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '28px', fontWeight: '600' }],
        body: ['15px', { lineHeight: '24px' }],
        small: ['13px', { lineHeight: '20px' }],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
      },
      borderRadius: {
        input: '8px',
        card: '12px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
