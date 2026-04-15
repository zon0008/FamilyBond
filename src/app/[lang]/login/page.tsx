export const dynamic = 'force-dynamic';
"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { LogIn, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const dict: Record<string, any> = {
    ko: { title: "가족을 찾기 위해\n1초만에 로그인해 주세요", desc: "복잡한 정보 입력 없이 안전하게 시작할 수 있습니다.", google: "Google로 계속하기", kakao: "Kakao로 시작하기", apple: "Apple ID로 로그인", back: "돌아가기" },
    en: { title: "Log in seamlessly\nto find your family", desc: "No complex forms. Start securely in one second.", google: "Continue with Google", kakao: "Start with Kakao", apple: "Sign in with Apple", back: "Go Back" },
    es: { title: "Inicia sesión fácilmente\npara encontrar a tu familia", desc: "Sin formularios complejos. Comienza de forma segura.", google: "Continuar con Google", kakao: "Iniciar con Kakao", apple: "Iniciar sesión con Apple", back: "Volver" }
};

export default function LoginPage() {
    const { lang } = useParams();
    const searchParams = useSearchParams();
    const nextUrl = searchParams.get("next") || `/${lang}`;
    const d = dict[lang as string] || dict['ko'];
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleDemoLogin = () => {
        setIsLoading(true);
        // 데모 인증 쿠키 발급
        document.cookie = "demo_auth=true; path=/; max-age=3600";
        setTimeout(() => {
            window.location.href = nextUrl;
        }, 500);
    };

    const handleLogin = async (provider: 'google' | 'kakao' | 'apple') => {
        setIsLoading(true);
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        if (!url || url.includes('placeholder') || url.includes('your-project-id')) {
            handleDemoLogin();
            return;
        }

        // Resolve the site URL clearly for stable OAuth redirects
        const siteUrl = 'https://family-bond-final.vercel.app';
        const redirectUrl = `${siteUrl}/auth/callback?next=${nextUrl}`;

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: redirectUrl,
                queryParams: provider === 'kakao' ? {
                    prompt: 'select_account'
                } : {},
                scopes: provider === 'kakao' ? 'account_email profile_nickname profile_image' : undefined
            }
        });

        if (error) {
            console.error("Login error:", error);
            setIsLoading(false);
            // OAuth 실패 시 데모 로그인으로 유도 (KOE006 등 설정 오류 대비)
            alert(lang === 'ko'
                ? "카카오 인증 설정(Redirect URI)을 확인 중인 것 같습니다. 원활한 테스트를 위해 데모 로그인을 대신 실행합니다."
                : "Kakao Auth configuration is being verified. Switching to Demo Login for seamless preview.");
            handleDemoLogin();
        }
    };

    // i18n dictionary for the new button
    const demoText = (lang === 'ko' ? '로그인 없이 즉시 둘러보기' : 'Browse immediately without login');
    const demoDesc = (lang === 'ko' ? '가입 절차 없이 모든 기능을 바로 체험해보세요.' : 'Experience all features right away without registration.');
    const snsTitle = (lang === 'ko' ? '또는 SNS 계정으로 시작하기' : 'Or start with Social Accounts');

    return (
        <div className="w-full max-w-md mx-auto px-4 py-8 md:py-16 flex flex-col items-center animate-fade-in-up">
            <Link href={`/${lang}`} className="self-start inline-flex items-center text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> {d.back}
            </Link>

            <div className={`w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center transition-colors ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                    <LogIn className={`w-10 h-10 text-white ${isLoading ? 'animate-pulse' : ''}`} />
                </div>

                <h1 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white mb-2 whitespace-pre-line leading-tight px-2">
                    {d.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 max-w-[280px] mx-auto leading-relaxed">
                    {d.desc}
                </p>

                <div className="flex flex-col gap-4 w-full">
                    {/* Demo Login - PRIMARY ACTION */}
                    <div className="flex flex-col gap-2 mb-2">
                        <button onClick={handleDemoLogin} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-md flex items-center justify-center gap-3 active:scale-[0.98]">
                            <ShieldAlert className="w-5 h-5 text-amber-300" />
                            {demoText}
                        </button>
                        <p className="text-[11px] text-blue-500 dark:text-cyan-400 font-medium">
                            ✨ {demoDesc}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 my-4">
                        <div className="flex-1 h-[1px] bg-gray-100 dark:bg-slate-800" />
                        <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">{snsTitle}</span>
                        <div className="flex-1 h-[1px] bg-gray-100 dark:bg-slate-800" />
                    </div>

                    {/* Social Logins - SECONDARY ACTIONS */}
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleLogin('google')} className="w-full py-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700/50 transition shadow-sm flex items-center justify-center gap-3 active:scale-[0.98]">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </button>

                        <button onClick={() => handleLogin('kakao')} className="w-full py-4 bg-[#FEE500] text-[#000000] rounded-2xl font-bold hover:bg-[#FDD800] transition shadow-sm flex items-center justify-center gap-3 active:scale-[0.98]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C6.477 3 2 6.544 2 10.916c0 2.825 1.832 5.3 4.606 6.745-.2 1.405-.98 3.518-1.026 3.655-.06.183.18.257.294.133.109-.12 3.5-2.316 4.908-3.238.397.054.803.085 1.218.085 5.523 0 10-3.544 10-7.916C22 6.544 17.523 3 12 3z" /></svg>
                            Kakao
                        </button>
                    </div>
                </div>

                <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-10 leading-relaxed group">
                    SNS 로그인이 작동하지 않을 경우 Supabase 설정이 필요합니다. <br />
                    <span className="text-amber-500 dark:text-amber-400 font-bold block mt-1 animate-pulse">
                        💡 카카오톡/인스타그램 등 인앱 브라우저에서 구글 로그인이 안 될 경우, <br />
                        우측 상단 메뉴를 눌러 '다른 브라우저로 열기'를 선택해 주세요.
                    </span>
                    (기본적으로 Demo 로그인을 권장합니다)
                </p>
            </div>
        </div>
    );
}
