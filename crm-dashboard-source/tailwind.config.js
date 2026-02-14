/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                surface: "#141414",
                "surface-highlight": "#1C1C1C",
                border: "#262626",
                primary: "rgb(var(--color-primary) / <alpha-value>)", // Dynamic variable
                "primary-glow": "rgb(var(--color-primary) / 0.5)",
                secondary: "#10B981",
                accent: "#3B82F6", // Blue
                muted: "#737373",
                "text-main": "#FFFFFF",
                "text-secondary": "#A1A1AA",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'xl': '16px',
                '2xl': '24px',
                'card': '20px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
        },
    },
    plugins: [],
}
