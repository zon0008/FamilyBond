import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const locales = ['ko', 'en', 'es', 'ja', 'zh', 'ru', 'ar', 'hi', 'vi'];
const defaultLocale = 'ko';

export async function middleware(request: NextRequest) {
    const { supabaseResponse, user } = await updateSession(request);
    const { pathname } = request.nextUrl;
    const isDemoLogged = request.cookies.has('demo_auth');

    // 1. Admin 라우터 보호 (Mediator Command Center)
    if (pathname.includes('/admin')) {
        // 실제 운영 시 user.user_metadata.role === 'admin' 체크 필요. 
        // 데모 편의를 위해 isDemoLogged 허용
        const isAdmin = user?.user_metadata?.role === 'admin' || isDemoLogged;
        if (!isAdmin) {
            const lang = locales.find(l => pathname.startsWith(`/${l}`)) || defaultLocale;
            const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
            const protocol = request.headers.get('x-forwarded-proto') || 'https';
            const origin = host ? `${protocol}://${host}` : request.nextUrl.origin;
            return NextResponse.redirect(new URL(`/${lang}/login?next=${pathname}`, origin));
        }
    }

    // 2. 일반 인증 보호 경로
    if (pathname.includes('/post/new') && !user && !isDemoLogged) {
        const lang = locales.find(l => pathname.startsWith(`/${l}`)) || defaultLocale;
        const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
        const protocol = request.headers.get('x-forwarded-proto') || 'https';
        const origin = host ? `${protocol}://${host}` : request.nextUrl.origin;
        return NextResponse.redirect(new URL(`/${lang}/login?next=${pathname}`, origin));
    }

    // 3. 글로벌 다국어(i18n) 라우팅
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
        const protocol = request.headers.get('x-forwarded-proto') || 'https';
        const origin = host ? `${protocol}://${host}` : request.nextUrl.origin;

        const redirectUrl = new URL(`/${defaultLocale}${pathname}`, origin);
        const redirectResponse = NextResponse.redirect(redirectUrl);
        supabaseResponse.cookies.getAll().forEach(c => redirectResponse.cookies.set(c.name, c.value, c));
        return redirectResponse;
    }

    return supabaseResponse;
}

export const config = {
    // PWA & TWA 에셋(.well-known, manifest.json, sw.js 등)이 i18n에 의해 리다이렉트 되는 것을 방지
    matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico|manifest.json|sw.js|.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
