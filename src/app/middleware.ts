import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/courses/', request.url))
    }
}

export const config = {
    matcher: '/',
}
