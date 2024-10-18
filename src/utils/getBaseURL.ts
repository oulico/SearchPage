import {HOST} from 'constants/urls';

export const getBaseURL = () => {
    if (typeof window === 'undefined') {
        // 서버 사이드
        console.log('Server-side environment:', process.env.NODE_ENV);
        console.log('VERCEL:', process.env.VERCEL);
        console.log('VERCEL_URL:', process.env.VERCEL_URL);

        if (process.env.VERCEL === '1') {
            return `https://${process.env.VERCEL_URL}`;
        } else if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:3000';
        } else {
            return `https://${HOST}`;
        }
    } else {
        // 클라이언트 사이드
        console.log('Client-side environment:', process.env.NODE_ENV);
        console.log('NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);

        if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        } else if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:3000';
        } else {
            return window.location.origin;
        }
    }
}
