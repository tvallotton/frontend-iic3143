/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "main-blue": "#004AAD",
                "dark-blue": "#003A8D"
            },
            fontFamily: {
                "body": ["Open Sans", "sans-serif"],
                "title": ["Nunito", "sans-serif"],
            },
        },
    },
    plugins: [],
};