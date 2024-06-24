import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(-50vw)' },
          ' 100%': { transform: 'translateX(0)' },
        },
        
      },
      animation: {
        wiggle: 'wiggle 0.1s ease-in-out',
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      dropShadow: {
        glow: [
          "0 0px 1px rgba(255,255, 255, 0.15)",
          "0 0px 2px rgba(255, 255,255, 0.1)"
        ],
        glow2: [
          "0 0px 1px rgba(255,255, 255, 0.25)",
          "0 0px 2px rgba(255, 255,255, 0.5)"
        ]
      },

    },
  },
  plugins: []
};


export default config;
