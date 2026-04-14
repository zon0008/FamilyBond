import { headers } from 'next/headers';

/**
 * Returns the current origin based on request headers (server-side)
 * or window.location.origin (client-side).
 */
export async function getOrigin() {
    // ALWAYS prioritize the production domain to prevent localhost leakage in auth
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://family-bond-final.vercel.app';

    // Client-side
    if (typeof window !== 'undefined') {
        // Only return origin if it's the production one, otherwise return siteUrl
        return window.location.origin.includes('vercel.app') ? window.location.origin : siteUrl;
    }

    // Server-side (Fallback to siteUrl for stability)
    return siteUrl;
}
