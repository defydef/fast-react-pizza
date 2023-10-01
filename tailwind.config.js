/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: 'Roboto Mono, monospace', // overwrite default fontFamily
        },
        extend: {
            height: {
                screen: '100dvh',
            },
        },
    },
    plugins: [],
}
