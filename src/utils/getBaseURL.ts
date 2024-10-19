import { HOST } from 'constants/urls';

export const getBaseURL = () => {
    // 서버 사이드
    if (typeof window === 'undefined') {
        if (process.env.VERCEL_URL) {
            return `https://${process.env.VERCEL_URL}`;
        } else if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:3000';
        } else {
            return `https://${HOST}`;
        }
    }

    // 클라이언트 사이드
    return ''; // 상대 경로 사용
}

export const getFullURL = (path) => {
    const baseUrl = getBaseURL();
    return baseUrl ? `${baseUrl}${path}` : path;
}
