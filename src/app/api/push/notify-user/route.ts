import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

// VAPID 키 설정
webpush.setVapidDetails(
    "mailto:sinusung@naver.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const { userId, title, body, url } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "No userId provided" }, { status: 400 });
        }

        // 해당 유저의 모든 구독 정보 가져오기
        const { data: subscriptions, error } = await supabase
            .from("push_subscriptions")
            .select("*")
            .eq("user_id", userId);

        if (error) throw error;

        if (!subscriptions || subscriptions.length === 0) {
            return NextResponse.json({ success: true, message: "No subscriptions found for user" });
        }

        const payload = JSON.stringify({
            title: title || "FamilyBond",
            body: body || "가족 매칭 소식이 도착했습니다!",
            url: url || "/ko"
        });

        // 모든 기기에 알림 발송
        const pushPromises = subscriptions.map((sub) => {
            const pushConfig = {
                endpoint: sub.endpoint,
                keys: {
                    auth: sub.auth,
                    p256dh: sub.p256dh
                }
            };
            return webpush.sendNotification(pushConfig, payload).catch(err => {
                console.error("Single push failed:", err);
                // 만료된 구독은 삭제하는 로직을 추가할 수 있습니다.
            });
        });

        await Promise.all(pushPromises);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Notify User Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
