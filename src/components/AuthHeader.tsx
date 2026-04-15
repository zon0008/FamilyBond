"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { UserCircle, LogOut, CheckCircle, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthHeader({ lang, homeLabel, loginLabel }: { lang: string, homeLabel: string, loginLabel: string }) {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        // 가상 데모 계정 확인
        if (document.cookie.includes('demo_auth')) {
            setUser({ email: 'demo@familybond.net', user_metadata: { full_name: '데모 유저 (인증됨)' } });
            return;
        }

        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user || null);
        });
        return () => { authListener.subscription.unsubscribe(); };
    }, [supabase.auth]);

    const handleLogout = async () => {
        if (document.cookie.includes('demo_auth')) {
            document.cookie = "demo_auth=; Max-Age=0; path=/";
            window.location.reload();
            return;
        }
        await supabase.auth.signOut();
        router.refresh();
    };

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            const siteUrl = 'https://family-bond-final.vercel.app';
            const shareUrl = siteUrl + `/${lang}`;
            const shareTitle = lang === 'ko' ? 'FamilyBond - 가족의 소중한 인연' : 'FamilyBond - Precious Family Ties';
            const shareDesc = lang === 'ko'
                ? "헤어진 가족의 기적 같은 재회를 응원하는 'FamilyBond' 서비스를 소개합니다."
                : "Introducing 'FamilyBond', a service for reunited families.";

            // @ts-ignore
            const K = window.Kakao;
            const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

            if (K) {
                try {
                    // Force initialize if not already
                    const finalAppKey = appKey || '641031350a454d4554303351d3886562'; // Fallback to known good key if missing
                    if (!K.isInitialized()) {
                        K.init(finalAppKey);
                    }

                    if (K.isInitialized()) {
                        K.Share.sendDefault({
                            objectType: 'feed',
                            content: {
                                title: shareTitle,
                                description: shareDesc,
                                imageUrl: 'https://family-bond-final.vercel.app/mother_hero.png?v=1.5',
                                link: {
                                    mobileWebUrl: 'https://family-bond-final.vercel.app/' + lang,
                                    webUrl: 'https://family-bond-final.vercel.app/' + lang
                                },
                            },
                            buttons: [{
                                title: '서비스 보기',
                                link: {
                                    mobileWebUrl: 'https://family-bond-final.vercel.app/' + lang,
                                    webUrl: 'https://family-bond-final.vercel.app/' + lang
                                }
                            }]
                        });
                        return;
                    }
                } catch (e) {
                    console.error("Kakao share error:", e);
                }
            }

            // Fallback (SDK 로드 실패 또는 설정 미비 시)
            if (navigator.share) {
                navigator.share({ title: shareTitle, text: shareDesc, url: shareUrl }).catch(() => { });
            } else {
                navigator.clipboard.writeText(shareUrl);
                alert(lang === 'ko' ? '링크가 복사되었습니다. 친구에게 공유해 보세요!' : 'Link copied to clipboard!');
            }
        }
    };

    return (
        <div className="flex items-center gap-1.5 md:gap-3 font-medium text-sm">
            <Link href={`/${lang}`} className="hidden md:block text-foreground/70 hover:text-primary transition-colors">{homeLabel}</Link>

            {/* Kakao Referral Button - RESTORED & RENAMED */}
            <button
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-[#FEE500] hover:bg-[#FDD800] text-[#3c1e1e] py-1.5 px-3 md:px-4 rounded-full text-xs md:text-sm font-black transition-all shadow-sm active:scale-95 group border border-yellow-200/50"
                aria-label="Kakao Recommendation"
            >
                <MessageCircleMore className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block">{lang === 'ko' ? '잇다' : 'Connect'}</span>
            </button>

            <Link href={`/${lang}/post/new`} className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 py-1.5 px-3 md:px-4 rounded-full text-sm font-bold transition-all shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                <span className="hidden sm:block">{lang === 'ko' ? '나도 사연 찾기' : 'Find My Family'}</span>
            </Link>

            {user ? (
                <div className="group relative flex items-center gap-2 bg-background border border-border py-1.5 px-2 md:px-3 rounded-full cursor-pointer hover:bg-foreground/5 transition shadow-sm backdrop-blur-sm">
                    <UserCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground max-w-[60px] md:max-w-[120px] truncate flex items-center gap-1 text-xs md:text-sm font-bold">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        <CheckCircle className="w-3 h-3 text-green-500 dark:text-green-400 hidden md:block" />
                    </span>
                    {/* 하위 로그아웃 드롭다운 */}
                    <div className="absolute right-0 top-full mt-2 w-32 bg-background rounded-xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-2 text-sm font-bold transition">
                            <LogOut className="w-4 h-4" /> 로그아웃
                        </button>
                    </div>
                </div>
            ) : (
                <Link href={`/${lang}/login`} className="flex items-center gap-1.5 bg-foreground text-background py-1.5 px-3 md:px-5 rounded-full text-[10px] md:text-sm font-black hover:opacity-90 transition-all shadow-md active:scale-95 whitespace-nowrap uppercase tracking-tight">
                    {loginLabel}
                </Link>
            )}
        </div>
    );
}
