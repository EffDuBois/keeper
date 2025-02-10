/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        foreground: "var(--color-foreground)",
        background: "var(--color-background)",
        'navui-foreground': "var(--color-navui-foreground)",
        'navui-background': "var(--color-navui-background)",
        'primary-foreground': "#007bff", // blue
        'primary-background': "#e7f1ff", // light blue
      },
    },
  },
  plugins: [],
};
