/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com'],
    },
    webpack: (config) => {
        if (!config.resolve.fallback) {
            config.resolve.fallback = {};
        }
        config.resolve.fallback.fs = false;
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
}
   
export default nextConfig