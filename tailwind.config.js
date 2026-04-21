/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
          glow: "rgba(59, 130, 246, 0.5)",
        },
        secondary: "#14b8a6",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
