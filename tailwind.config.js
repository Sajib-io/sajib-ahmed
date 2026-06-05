/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["'Space Grotesk'", "sans-serif"],
                sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
            },
        },
    },
};
