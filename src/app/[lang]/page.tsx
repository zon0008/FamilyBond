import { Search, Heart } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n/getDictionary";
import HomeSearchBar from "@/components/HomeSearchBar";
import RecentStoriesGrid from "@/components/RecentStoriesGrid";
import PullToRefresh from "@/components/PullToRefresh";

const RECENT_STORIES = [
  { id: "1", title: "1995년 서울역에서 헤어진 동생을 찾습니다", name: "김영희", location: "서울특별시", date: "2026.04.05", tz: "Asia/Seoul" },
  { id: "2", title: "가슴에 점이 있는 오빠(박철수)를 찾아요", name: "박지은", location: "부산광역시", date: "2026.04.04", tz: "Asia/Seoul" },
  { id: "3", title: "어릴 적 보육원에 맡겨진 막내를 찾고 싶습니다", name: "이명수", location: "대전광역시", date: "2026.04.01", tz: "Asia/Seoul" },
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
          <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/30" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-2">
              <Heart className="w-4 h-4 text-indigo-600 fill-indigo-200 dark:text-indigo-400 dark:fill-indigo-900" />
              <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">실시간 가족 매칭 플랫폼</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-4xl"
              style={{ textWrap: 'balance' }}
              dangerouslySetInnerHTML={{ __html: dict.home.title }}
            />

            <p
              className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: dict.home.desc }}
            />

            <HomeSearchBar placeholder={dict.home.placeholder} lang={lang} />
          </div>
        </section>

        <AdUnit type="banner" />

        {/* Recent Stories - Premium Grid */}
        <section className="flex flex-col gap-8 relative z-10 px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <span className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
                  <Heart className="w-6 h-6 text-white" />
                </span>
                {dict.home.recent}
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-bold ml-12">최근 올라온 소중한 사연들입니다</p>
            </div>
            <Link href={`/${lang}/search/results`} className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{dict.home.all}</span>
              <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <Search className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
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
