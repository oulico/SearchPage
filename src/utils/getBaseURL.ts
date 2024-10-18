import {HOST} from 'constants/urls';

export const getBaseURL = () => {
    if (typeof window === 'undefined') {
        // 서버 사이드
        console.log('Server-side environment:', process.env.NODE_ENV);
        console.log('VERCEL:', process.env.VERCEL);
        console.log('VERCEL_URL:', process.env.VERCEL_URL);

        if (process.env.VERCEL === '1') {
            console.log('Server side if process.env.VERCEL_URL:', process.env.VERCEL_URL);
            return `https://${process.env.VERCEL_URL}`;
        } else if (process.env.NODE_ENV === 'development') {
            console.log('Server side else if process.env.VERCEL_URL:', process.env.VERCEL_URL);
            return 'http://localhost:3000';
        } else {
            console.log('Server side else process.env.VERCEL_URL:', process.env.VERCEL_URL);
            return `https://${HOST}`;
        }
    } else {
        // 클라이언트 사이드
        console.log('Client-side environment:', process.env.NODE_ENV);
        console.log('NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);

        if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            console.log('if process.env.NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);
            return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        } else if (process.env.NODE_ENV === 'development') {
            console.log('else if process.env.NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);
            return 'http://localhost:3000';
        } else {
            console.log('else process.env.NEXT_PUBLIC_VERCEL_URL:', process.env.NEXT_PUBLIC_VERCEL_URL);
            return window.location.origin;
        }
    }
}
