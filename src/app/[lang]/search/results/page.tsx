import { Suspense } from "react";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";

// Server component approach for search params in App Router requires handling searchParams
export default async function SearchResultsPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || "";

    // 더미 데이터 결과
    const results = [
        { id: "101", title: `"${query}" 님을 애타게 찾습니다`, name: "김정석", location: "대구광역시", date: "2026.04.06" },
        { id: "102", title: `어릴적 헤어진 "${query}" 동생을 찾아요`, name: "이영희", location: "서울특별시", date: "2026.03.28" },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Search className="w-6 h-6 text-primary" />
                    검색 결과
                </h1>
                <p className="text-gray-600 dark:text-slate-300">
                    <span className="font-bold text-accent">"{query}"</span>에 대한 정밀 분석 결과 모음입니다.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {results.map(res => (
                    <Link key={res.id} href={`/post/${res.id}`} className="block bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-primary transition-colors group">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary mb-3">{res.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {res.location}</span>
                            <span>작성자: {res.name}</span>
                            <span>{res.date}</span>
                        </div>
                    </Link>
                ))}
                {query && results.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500 mb-4">안타깝게도 일치하는 기록을 찾지 못했습니다.</p>
                        <Link href="/" className="px-6 py-2 bg-primary text-white rounded-full text-sm hover:bg-primary/90">새로운 사연 등록하기</Link>
                    </div>
                )}
            </div>

            <AdUnit type="banner" className="mt-8" />
        </div>
    );
}
