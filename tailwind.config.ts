import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        darkTheme: {
          'primary': '#5988FC',
          'secondary': '#DD5587',
          'base-100': '#191919',
          'base-200': '#424242',
          'base-300': '#929292',
          'base-content': '#F2F2F2',
          'neutral': '#2a323c',
          'neutral-content': '#FFFFFF',
          'success': '#04CD76',
          'warning': '#FE3300',
          'error': '#fc3c3b',
          // Custom colors
          'left-panel-bg1': 'rgba(192, 192, 192, 0.04)',
          'left-panel-bg2': 'rgba(201, 180, 180, 0.04)',
          'left-panel-bg3': 'rgba(0, 0, 0, 0.04)',
        },
      },
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
      }
    ],
  },
  theme: {
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
    },
    extend: {
      backgroundImage: (theme) =>({
        'custom-gradient': "linear-gradient(180deg, ${theme('primary')} 0%, ${theme('left-panel-bg2')}) 54.5%, ${theme('left-panel-bg3')} 100%)",
      }),
    }
  },
  plugins: [require("daisyui")],
};
export default config;
