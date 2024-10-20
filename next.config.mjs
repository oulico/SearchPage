/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        emotion: true
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },

    async headers() {
        const headers = [];
        if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
            headers.push({
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex',
                    },
                ],
                source: '/:path*',
            });
        }
        return headers;
    },
};

export default nextConfig;
