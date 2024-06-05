/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": {
                    "100": "#cceef0",
                    "200": "#008a90",
                    "300": "#008289",
                    "400": "#007b81",
                    "500": "#007479",
                    "600": "#00ADB5",
                    "700": "#006c71",
                    "800": "#00656a",
                    "900": "#005d62"
                },
                "secondary": {
                    "100": "#ffddd6",
                    "200": "#cc4528",
                    "300": "#c14126",
                    "400": "#b63e24",
                    "500": "#ab3a22",
                    "600": "#FF5733",
                    "700": "#a03620",
                    "800": "#95321d",
                    "900": "#8a2f1b"
                }
            }
        }
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require('@tailwindcss/forms'),
    ],
}

