/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['"Open Sans"', 'sans-serif'],
                'montserrat': ['"Montserrat"', 'sans-serif'],
                'rubik': ['"Rubik"', 'sans-serif'],
            },
            colors: {
                'primary': '#1ba030',
                'secondary': '#5bc369',
                'tertiary': '#e9f4e6',
                'highlight': '#fac647',
            },
            backgroundColor: {
                'primary': '#1ba030',
                'secondary': '#5bc369',
                'tertiary': '#e9f4e6',
                'highlight': '#fac647',
                'neutral': '#f3f2f8',
            },
            backgroundImage: {
                'login': "url('assets/images/login-hero.jpg')",
            },
        },
    },
    plugins: [],
}