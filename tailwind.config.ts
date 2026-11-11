import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#a855f7',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
      },
      animation: {
        'snowfall': 'snowfall 10s linear infinite',
        'leaffall': 'leaffall 8s linear infinite',
        'pollenfall': 'pollenfall 6s linear infinite',
        'goldenleaf': 'goldenleaf 9s linear infinite',
      },
      keyframes: {
        snowfall: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)' },
        },
        leaffall: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)' },
        },
        pollenfall: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(110vh)' },
        },
        goldenleaf: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

