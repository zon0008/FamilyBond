export const dynamic = 'force-dynamic';
import { Search, Heart } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n/getDictionary";
import HomeSearchBar from "@/components/HomeSearchBar";
import RecentStoriesGrid from "@/components/RecentStoriesGrid";
import PullToRefresh from "@/components/PullToRefresh";

const RECENT_STORIES = [
  { id: "mother-hero", title: "어머니, 화면 속 인자하게 웃고 계신 당신의 얼굴을 보니 가슴 한구석이 아려옵니다", name: "최주영", location: "대한민국", date: "2026. 4. 8.", tz: "Asia/Seoul", image: "/mother_hero.png?v=1.6" },
];

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang || 'ko';
  const dict = await getDictionary(lang);

  return (
    <PullToRefresh>
      <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-16 overflow-hidden">
        {/* Hero Section - Vibrant & Hooking */}
        <section className="relative text-center py-24 md:py-32 flex flex-col items-center justify-center rounded-[3rem] overflow-hidden">
          {/* Animated Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-background via-primary/5 to-background" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-2">
              <Heart className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-[11px] font-black text-primary uppercase tracking-widest">실시간 가족 매칭 플랫폼</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-8xl font-black text-foreground leading-[1.05] tracking-tighter max-w-4xl italic"
              style={{ textWrap: 'balance' }}
              dangerouslySetInnerHTML={{ __html: dict.home.title }}
            />

            <p
              className="text-foreground/60 dark:text-slate-300 max-w-2xl text-lg md:text-xl font-medium leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: dict.home.desc }}
            />

            <HomeSearchBar placeholder={dict.home.placeholder} lang={lang} />
          </div>
        </section>

        <AdUnit type="banner" />

        {/* Recent Stories - Premium Grid */}
        <section className="flex flex-col gap-10 relative z-10 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-border">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-black text-foreground flex items-center gap-4">
                <span className="p-3 bg-primary rounded-2xl shadow-xl shadow-primary/20">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-white fill-white/20" />
                </span>
                {dict.home.recent}
              </h2>
              <p className="text-foreground/60 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                {lang === 'ko' ? '최근 올라온 소중한 사연들입니다. 여러분의 따뜻한 관심이 기적을 만듭니다.' : 'Valuable stories posted recently. Your warm interest creates miracles.'}
              </p>
            </div>
            <Link href={`/${lang}/search/results`} className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-border">
              <span className="text-sm md:text-base font-black uppercase tracking-wider">{dict.home.all}</span>
              <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Search className="w-4 h-4 text-background group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>

          <RecentStoriesGrid initialStories={RECENT_STORIES} lang={lang} dict={dict} />
        </section>

        <AdUnit type="banner" />
        <div className="h-20" /> {/* Extra spacing for bottom nav */}
      </div>
    </PullToRefresh>
  );
}
