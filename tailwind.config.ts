import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma Dark Theme Colors
        bg: '#0c0a09',
        surface: '#161310',
        card: '#1e1a16',
        'card-hover': '#262118',
        border: '#302b25',
        cream: '#f5f0e8',
        'cream-dim': '#c5bdb4',
        muted: '#7a7068',
        amber: '#f59e0b',
        'amber-light': '#fde68a',
        'amber-dark': '#b45309',
        orange: '#ea580c',
        green: '#16a34a',
        'green-light': '#bbf7d0',
        
        // Original DishWise Brand Colors (Light Theme)
        primary: {
          DEFAULT: '#FFBE29',
          dark: '#E6A824',
          light: '#FFD166',
          50: '#FFF9E6',
          100: '#FFF3CC',
        },
        'brand-yellow': '#FFBE29',
        'accent-red': '#F4524E',
        'accent-blue': '#6294F7',
        
        // Neutral Colors
        foreground: '#2B2B2B',
        secondary: '#3D4152',
        'muted-light': 'rgba(43, 43, 43, 0.3)',
        
        // Semantic Colors
        success: '#1BA672',
        savings: '#4CAF50',
        warning: '#FFBE29',
        error: '#F4524E',
        info: '#6294F7',
        
        // Background Colors (Light Theme)
        'bg-primary': '#FFFFFF',
        'bg-subtle': '#EAEAEA',
        'bg-secondary': '#FAFAFA',
        'bg-card': '#FFFFFF',
        'bg-footer': '#2B2B2B',
        'bg-hero': '#2B2B2B',
        background: '#F5F5F5',
        
        // Text Colors
        'text-main': '#2B2B2B',
        'text-secondary': 'rgba(43, 43, 43, 0.7)',
        'text-muted': 'rgba(43, 43, 43, 0.5)',
        text: {
          DEFAULT: '#2B2B2B',
          muted: 'rgba(43, 43, 43, 0.5)',
          secondary: 'rgba(43, 43, 43, 0.7)',
        },
        
        // CTA Colors
        cta: {
          DEFAULT: '#FFBE29',
          dark: '#E6A824',
        },
        
        // Highlight Colors
        highlight: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },
        
        // Gray Scale
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EAEAEA',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#2B2B2B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'Inter', 'sans-serif'],
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'swiggy': '0 15px 40px -20px rgba(40, 44, 63, 0.15)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
        'spin-slow': 'spin 2s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 190, 41, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255, 190, 41, 0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
