// @ts-nocheck
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [
        ...defaultCache,
        {
            matcher: /^https:\/\/family-bond-final\.vercel\.app\/.*\/post\//,
            handler: "NetworkFirst",
            options: {
                cacheName: "story-details",
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
            },
        },
    ],
});

// Push Notification Support
self.addEventListener("push", (event) => {
    const data = event.data?.json() || {
        title: "FamilyBond",
        body: "소중한 인연이 연결되었습니다!",
        icon: "/icon-192x192.png"
    };

    const options = {
        body: data.body,
        icon: "/icon-512x512.png",
        badge: "/icon-192x192.png",
        vibrate: [100, 50, 100],
        data: {
            url: data.url || "/ko"
        }
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});

serwist.addEventListeners();
