"use client";
import React, { useEffect, useState } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion";

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export default function PushNotificationManager() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [permission, setPermission] = useState<NotificationPermission>("default");
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkSubscription();
    }, []);

    const checkSubscription = async () => {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
            setIsLoading(false);
            return;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        setIsSubscribed(!!subscription);
        setPermission(Notification.permission);
        setIsLoading(false);
    };

    const subscribe = async () => {
        setIsLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;

            const permission = await Notification.requestPermission();
            setPermission(permission);
            if (permission !== "granted") {
                throw new Error("Notification permission denied");
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
            });

            // Save to Supabase
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const subJSON = subscription.toJSON();
                await supabase.from("push_subscriptions").upsert({
                    user_id: user.id,
                    endpoint: subJSON.endpoint,
                    auth: subJSON.keys?.auth,
                    p256dh: subJSON.keys?.p256dh,
                    updated_at: new Date().toISOString()
                }, { onConflict: "endpoint" });
            }

            setIsSubscribed(true);
        } catch (error) {
            console.error("Push subscription error:", error);
            alert("알림 설정에 실패했습니다. 브라우저 설정을 확인해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const unsubscribe = async () => {
        setIsLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                await subscription.unsubscribe();

                // Remove from Supabase
                const subJSON = subscription.toJSON();
                await supabase.from("push_subscriptions").delete().match({ endpoint: subJSON.endpoint });
            }
            setIsSubscribed(false);
        } catch (error) {
            console.error("Push unsubscription error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>확인 중...</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${isSubscribed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 dark:bg-slate-700'}`}>
                        {isSubscribed ? <Bell size={24} /> : <BellOff size={24} />}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">푸시 알림 설정</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            {isSubscribed ? '알림을 받고 있습니다.' : '매칭 소식을 실시간으로 받아보세요.'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={isSubscribed ? unsubscribe : subscribe}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 ${isSubscribed
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
                        : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                        }`}
                >
                    {isSubscribed ? '알림 끄기' : '알림 켜기'}
                </button>
            </div>

            {permission === "denied" && (
                <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                    브라우저에서 알림 권한이 거부되어 있습니다. 주소창의 자물쇠 아이콘을 눌러 권한을 허용해 주세요.
                </p>
            )}
        </motion.div>
    );
}
