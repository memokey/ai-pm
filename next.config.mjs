/** @type {import('next').NextConfig} */
import withPlugins from "next-compose-plugins"
import webpack from "webpack"
import transpileModules from "next-transpile-modules"

const withTM = transpileModules([
    "@solana/wallet-adapter-react",
    "@solana/wallet-adapter-wallets",
    "@solana/wallet-adapter-base",
    "@solana/wallet-adapter-react-ui",
]);

const nextConfig = {
    distDir: "build",
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
            config.resolve.alias = {
                ...config.resolve.alias,
                "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
                "react/jsx-runtime": "react/jsx-runtime.js"
            }
            // FIX this
            // Disable minimize to make it work with Candy Machine template
            // minimization brakes Public Key names
            config.optimization.minimize = false;
        }
        config.plugins.push(
            new webpack.IgnorePlugin({
                resourceRegExp: /^electron$/,
            })
        );
        return config;
    },
};


export default withPlugins([withTM], nextConfig);
