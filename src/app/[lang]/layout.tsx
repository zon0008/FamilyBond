import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";
import AuthHeader from "@/components/AuthHeader";
import LanguageSelector from "@/components/LanguageSelector";
import BottomNav from "@/components/BottomNav";
import InstallPrompt from "@/components/InstallPrompt";
import { Mail } from "lucide-react";

import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#d4c5b9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "FamilyBond - 가족의 소중한 인연을 찾습니다",
  description: "현대판 이산가족 찾기 및 재회 지원 플랫폼",
};

import { ThemeToggle } from "@/components/ThemeToggle";

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang || 'ko';
  const dict: any = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen text-foreground flex flex-col bg-background transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-3 md:px-6 py-2 md:py-4 sticky top-0 z-50 transition-all">
            <div className="flex items-center gap-2 md:gap-8">
              <Link href={`/${lang}`} className="font-bold text-xl md:text-2xl text-primary tracking-tight shrink-0" aria-label="FamilyBond Home">
                Family<span className="text-accent hidden sm:inline">Bond</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-500 dark:text-slate-400">
                <Link href={`/${lang}/about`} className="hover:text-primary transition-colors tracking-wide">{dict.nav.about}</Link>
                <Link href={`/${lang}/faq`} className="hover:text-primary transition-colors tracking-wide">{dict.nav.faq}</Link>
                <Link href={`/${lang}/contact`} className="hover:text-primary transition-colors tracking-wide">{dict.nav.contact}</Link>
              </nav>

              <div className="hidden md:block">
                <LanguageSelector currentLang={lang} />
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <ThemeToggle />
              <AuthHeader lang={lang} homeLabel={dict.nav.home} loginLabel={lang === 'en' ? 'Log in' : lang === 'es' ? 'Iniciar sesión' : '로그인'} />
            </div>
          </header>

          <main className="flex-1 flex flex-col w-full relative">
            {props.children}
          </main>

          <footer className="w-full bg-white/95 dark:bg-slate-900/95 border-t border-gray-100 dark:border-slate-800 py-12 md:py-16 text-center text-sm text-gray-500 dark:text-slate-400 mt-auto md:pb-12 pb-24 transition-colors">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
                <div className="col-span-1 md:col-span-2 space-y-6">
                  <h3 className="text-2xl font-black text-primary italic">FamilyBond</h3>
                  <p className="text-base text-gray-600 dark:text-slate-400 leading-relaxed max-w-sm">
                    "{dict.quotes[0]}"
                    <br />
                    우리는 기술과 진심을 다해 헤어진 가족의 기적 같은 재회를 응원합니다.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">{lang === 'ko' ? '서비스 정보' : 'Information'}</h4>
                  <ul className="space-y-3 font-medium">
                    <li><Link href={`/${lang}/about`} className="hover:text-primary transition-colors">{dict.nav.about}</Link></li>
                    <li><Link href={`/${lang}/faq`} className="hover:text-primary transition-colors">{dict.nav.faq}</Link></li>
                    <li><Link href={`/${lang}/contact`} className="hover:text-primary transition-colors">{dict.nav.contact}</Link></li>
                    <li><Link href={`/${lang}/terms`} className="hover:text-primary transition-colors">{dict.nav.terms}</Link></li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">{lang === 'ko' ? '문의하기' : 'Contact'}</h4>
                  <a href="mailto:sinusung@naver.com" className="flex items-center gap-3 text-primary font-bold hover:underline group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Mail size={18} />
                    </div>
                    sinusung@naver.com
                  </a>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    {lang === 'ko' ? '24시간 상시 제보 및 문의 접수 중' : 'Receiving reports and inquiries 24/7'}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 FamilyBond. All rights reserved.</p>
                <div className="flex gap-6 opacity-60">
                  <span className="hover:text-primary cursor-default transition-colors">Privacy Policy</span>
                  <span className="hover:text-primary cursor-default transition-colors">Terms of Service</span>
                </div>
              </div>
            </div>
          </footer>
          <BottomNav lang={lang} />
          <InstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
