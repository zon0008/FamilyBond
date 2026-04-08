"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { UserCircle, LogOut, CheckCircle } from "lucide-react";
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

    return (
        <div className="flex items-center gap-1.5 md:gap-4 font-medium text-sm">
            <Link href={`/${lang}`} className="hidden md:block hover:text-accent dark:text-slate-300 dark:hover:text-cyan-400 transition-colors">{homeLabel}</Link>

            <Link href={`/${lang}/post/new`} className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 py-1.5 px-3 md:px-4 rounded-full text-sm font-bold transition-all shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                <span className="hidden sm:block">{lang === 'ko' ? '나도 사연 찾기' : 'Find My Family'}</span>
            </Link>

            {user ? (
                <div className="group relative flex items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 py-1.5 px-2 md:px-3 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition shadow-sm">
                    <UserCircle className="w-5 h-5 text-primary dark:text-cyan-400" />
                    <span className="text-gray-700 dark:text-slate-200 max-w-[60px] md:max-w-[120px] truncate flex items-center gap-1 text-xs md:text-sm">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        <CheckCircle className="w-3 h-3 text-green-500 dark:text-green-400 hidden md:block" />
                    </span>
                    {/* 하위 로그아웃 드롭다운 */}
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-2 text-sm font-bold transition">
                            <LogOut className="w-4 h-4" /> 로그아웃
                        </button>
                    </div>
                </div>
            ) : (
                <Link href={`/${lang}/login`} className="flex items-center gap-1.5 bg-gray-900 dark:bg-primary text-white py-1 px-2.5 md:px-5 rounded-full text-[10px] md:text-sm font-bold hover:bg-black dark:hover:brightness-110 transition-all shadow-sm active:scale-95 whitespace-nowrap">
                    {loginLabel}
                </Link>
            )}
        </div>
    );
}
