import { headers } from 'next/headers';

/**
 * Returns the current origin based on request headers (server-side)
 * or window.location.origin (client-side).
 */
export async function getOrigin() {
    // Client-side
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }

    // Server-side
    const headerList = await headers();
    const host = headerList.get('x-forwarded-host') || headerList.get('host');
    const protocol = headerList.get('x-forwarded-proto') || 'https';

    // In local development, protocol might be http
    if (!host) return process.env.NEXT_PUBLIC_SITE_URL || 'https://family-bond-final.vercel.app';

    return `${protocol}://${host}`;
}
