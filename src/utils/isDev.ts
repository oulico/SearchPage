import {isServer} from 'utils/isServer';

export const isDev = () => {
    if (isServer()) {
        return process.env.NODE_ENV === 'development';
    }

    return globalThis.location.hostname === 'localhost';
};
