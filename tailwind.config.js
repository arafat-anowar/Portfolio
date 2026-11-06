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
        ewu: {
          brick: "#a33a2a",
          "brick-dark": "#7a281c",
          "brick-light": "#c44c3b",
          "brick-mortar": "#4a1811",
          navy: "#0a1128",
          "navy-dark": "#050814",
          "navy-light": "#131e42",
          tile: "#873e33",
          "tile-border": "#5c241c",
          warm: "#ffbe53",
          "warm-glow": "rgba(255, 190, 83, 0.4)",
          canopy: "#2dd4bf",
        },
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "monospace"],
      },
    },
  },
  plugins: [],
};
