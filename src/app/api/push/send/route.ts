import { NextResponse } from "next/server";
import webpush from "web-push";

// VAPID 키 설정
webpush.setVapidDetails(
    "mailto:sinusung@naver.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
    try {
        const { subscription, title, body, url } = await request.json();

        if (!subscription || !subscription.endpoint) {
            return NextResponse.json({ error: "No subscription provided" }, { status: 400 });
        }

        const payload = JSON.stringify({
            title: title || "FamilyBond",
            body: body || "새로운 알림이 있습니다.",
            url: url || "/ko"
        });

        await webpush.sendNotification(subscription, payload);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Push Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
