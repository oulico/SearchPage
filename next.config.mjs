import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    compiler: {
        emotion: true,
    },

};

export default withVanillaExtract(nextConfig);
