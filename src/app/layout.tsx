'use client'
import { ReactNode, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import store from "@/redux/store";
// Wallet connection
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
//Styles
import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/custom.css";
import "@/styles/wallet.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const inter = Inter({ subsets: ["latin"] });

type Web3ProviderType = {
  children: ReactNode;
}

const Web3Provider = (props: Web3ProviderType) => {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet)

  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
    ],
    [network]
)

  return (
    <ConnectionProvider
      endpoint={
        'https://tiniest-responsive-cloud.solana-mainnet.discover.quiknode.pro/2f87fef26a0de6ba748209443bb4b121de112b38/'
      }
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            {props.children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

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
            <Web3Provider>
              <main className="h-[100vh] bg-base-100">{children}</main>
            </Web3Provider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
