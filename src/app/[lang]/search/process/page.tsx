"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import AdUnit from "@/components/AdUnit";
import { Search } from "lucide-react";

const D = {
    ko: ["가족의 소중한 단서를 찾고 있습니다...", "과거 기록까지 대조 중입니다...", "전국 데이터를 스캔 중입니다...", "일치하는 사연을 정밀 분석 중입니다..."],
    en: ["Looking for precious clues...", "Cross-checking past records...", "Scanning nationwide data...", "Analyzing matching cases..."],
    es: ["Buscando pistas preciosas...", "Revisando registros pasados...", "Escaneando datos a nivel nacional...", "Analizando casos coincidentes..."]
};

function SearchProcess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { lang } = useParams();
    const query = searchParams.get("q") || "";

    const strings = D[(lang as keyof typeof D)] || D.ko;

    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const steps = 100;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress(currentStep);

            if (currentStep % 25 === 0) {
                setTextIndex(prev => Math.min(prev + 1, strings.length - 1));
            }

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => router.push(`/${lang}/search/results?q=${encodeURIComponent(query)}`), 100);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [query, router, lang, strings.length]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Search className="w-8 h-8 text-primary" />
                </div>

                <p className="text-sm text-gray-600 mb-6 font-medium animate-pulse h-6">
                    {strings[textIndex]}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-accent transition-all duration-75" style={{ width: `${progress}%` }} />
                </div>

                {/* Full-screen AdUnit */}
                <div className="w-full">
                    <AdUnit type="fullscreen" className="!my-0 rounded-2xl border-none shadow-inner bg-gray-50/50" />
                </div>
            </div>
        </div>
    );
}

export default function SearchProcessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchProcess />
        </Suspense>
    );
}
