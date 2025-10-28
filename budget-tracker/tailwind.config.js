/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          '50': '#f0f4f8',
          '100': '#d4e2e8',
          '200': '#b8cfd6',
          '300': '#9bbcc3',
          '400': '#7da8ae',
          '500': '#1a1a2e',
          '600': '#162541',
          '700': '#0f1929',
          '800': '#0d141f',
          '900': '#0a0f15',
        },
        'orange': {
          '50': '#fff5f0',
          '100': '#ffe3d4',
          '200': '#ffc8b3',
          '300': '#ffa983',
          '400': '#ff8c5c',
          '500': '#ff7039',
          '600': '#ff5d1f',
          '700': '#e64500',
          '800': '#cc3d00',
          '900': '#b33500',
        },
        'pink': {
          '50': '#fef2f5',
          '100': '#fde4eb',
          '200': '#fbd1dd',
          '300': '#f9b8ca',
          '400': '#f799b3',
          '500': '#f47ca0',
          '600': '#ed5d8a',
          '700': '#de4a72',
          '800': '#c73f63',
          '900': '#a83553',
        }
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}



