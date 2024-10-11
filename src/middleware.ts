import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    // '/' 경로로 요청이 들어오면 '/courses/'로 리다이렉트
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/courses/', request.url));
    }

    // '/api/courses' 요청에 대해 프록시 처리
    // if (request.nextUrl.pathname.startsWith('/api/courses')) {
    //     const url = request.nextUrl.clone();
    //
    //     // 원하는 API URL로 요청을 프록시합니다.
    //     url.hostname = 'api-rest.elice.io'; // 프록시할 외부 API의 호스트네임으로 변경
    //     url.protocol = 'https'; // 필요한 경우 프로토콜도 변경
    //
    //     // CORS 헤더 추가
    //     const res = NextResponse.rewrite(url);
    //     res.headers.set('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
    //     res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 허용할 HTTP 메서드
    //     res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 허용할 헤더
    //
    //     return res;
    // }
    //
    // 기본 응답
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/api/courses'], // '/'와 '/api/courses' 경로에 대해 미들웨어를 적용
};
