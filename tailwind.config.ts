import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          'primary': '#757575',
          'base-100': '#FFFFFF',
          'secondary': '#b0cfff',
          'base-content': '#e0e0e0',
          'base': '#f0f0f0',
          'success': '#aee5c8',
          'warning': '#ffcc99',
          'error': '#ff9999',
        }
      },
      {
        darkTheme: {
          'primary': '#3b81ff',
          'base-100': '#15161a',
          'secondary': '#dc8fff',
          'base-content': '#a6a7a7',
          'base-200': '#292b30',
          'success': '#62d993',
          'warning': '#ff993a',
          'error': '#fc3c3b',
          'neutral': '#2a323c'
        }
      }
    ],
  }
};
export default config;
