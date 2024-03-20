'use client'

import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import store from "@/redux/store";
import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/custom.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider>
            <main className="h-[100vh] bg-base-100">{children}</main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
