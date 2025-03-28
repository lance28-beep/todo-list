/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'primary': 'var(--primary)',
        'button-primary-hover': 'var(--button-primary-hover)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
      },
    },
  },
  plugins: [],
} 