import {isDev} from 'utils/isDev';

export const getBaseURL = () => {
    if (isDev()) {
        return `http://localhost:3000`;
    }
};
