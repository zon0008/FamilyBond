"use client";
import React, { useState, useEffect } from "react";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, Heart, ShieldCheck, Mail, Lock, Unlock, Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import { createBrowserClient } from "@supabase/ssr";

const clientDict: Record<string, any> = {
    ko: { back: "목록으로 돌아가기", trustScore: "신뢰도 지수", author: "찾는 이", heart: "가족이라고 생각되시나요?", messageTitle: "정확한 증빙이나 특징을 적어주세요", messagePlaceholder: "예: 어릴 적 사진, 상처 위치 등...", notify: "매칭 결과 알림 받기", submit: "관리자 검토 요청하기", waitingAd: "안전한 연결망을 준비 중입니다..." },
    en: { back: "Back to list", trustScore: "Trust Score", author: "Looking for", heart: "Is this your family?", messageTitle: "Provide proof or specific features", messagePlaceholder: "e.g., childhood photos, scars...", notify: "Get matched updates", submit: "Request Admin Review", waitingAd: "Securing connection..." },
    es: { back: "Volver", trustScore: "Confianza", author: "Buscando", heart: "¿Es esta tu familia?", messageTitle: "Proporciona pruebas o marcas únicas", messagePlaceholder: "ej. fotos de infancia, cicatrices...", notify: "Recibir estado del match", submit: "Solicitar revisión", waitingAd: "Asegurando conexión..." }
};

export default function PostDetailPage() {
    const { lang, id } = useParams();
    const router = useRouter();
    const d = clientDict[lang as string] || clientDict['ko'];
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [funnelStep, setFunnelStep] = useState(0);
    const [showFloating, setShowFloating] = useState(false);
    const [mockData, setMockData] = useState<any>(null);

    // 워크플로우 매칭 상태 ('idle', 'pending', 'approved')
    const [matchStatus, setMatchStatus] = useState<'idle' | 'pending' | 'approved'>('idle');

    useEffect(() => {
        if (typeof id === 'string' && id.startsWith('demo-')) {
            const saved = localStorage.getItem(`mock_post_${id}`);
            if (saved) {
                setMockData(JSON.parse(saved));
            }
        }

        const handleScroll = () => setShowFloating(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'FamilyBond - 소중한 인연을 찾습니다',
                    text: mockData ? mockData.story : '이 사연의 주인공을 안다면 꼭 제보해 주세요.',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('공유 취소됨');
            }
        } else {
            alert("데스크톱 환경에서는 링크를 수동으로 복사해주세요.\n" + window.location.href);
        }
    };

    const handleNextStep = async () => {
        if (funnelStep === 2) {
            setFunnelStep(3);

            // Push 알림 시뮬레이션: 현재 사용자에게 푸시를 보냅니다. (실제 환경에서는 포스트 작성자에게 발송)
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    await fetch('/api/push/notify-user', {
                        method: 'POST',
                        body: JSON.stringify({
                            userId: user.id,
                            title: 'FamilyBond',
                            body: '새로운 매칭 요청이 도착했습니다! "소중한 인연이 연결되었습니다!"',
                            url: window.location.href
                        })
                    });
                }
            } catch (error) {
                console.error('Trigger push error:', error);
            }

            setTimeout(() => {
                // 5초 광고 시청 후 연락처를 바로 공개하는 대신, Match Request(승인대기) 모드로 전환.
                setMatchStatus('pending');
                setFunnelStep(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 5000);
        } else {
            setFunnelStep(prev => prev + 1);
        }
    };

    // [데모 전용 API]: 작성자 이름을 연타해 매칭 관리자가 승인한 상황을 시뮬레이션
    const simulateAdminApproval = () => {
        setMatchStatus('approved');
        setTimeout(() => {
            alert(`[System 알림] \n매칭 관리자가 두 분의 가족 관계를 승인했습니다!\n보안 마스킹이 해제되어 진짜 연락처가 교환됩니다.`);
        }, 100);
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-8 relative">
            <div className="flex items-center justify-between mb-8">
                <Link href={`/${lang}`} className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {d.back}
                </Link>
                <Link href={`/${lang}/post/new`} className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-cyan-400 font-extrabold rounded-xl transition shadow-sm text-sm group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                    {lang === 'ko' ? '사연 남기기' : 'Post a Story'}
                </Link>
            </div>

            <article className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors">
                <div className="relative w-full h-64 md:h-80 bg-gray-100 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800">
                    <Image src={mockData?.image || "https://picsum.photos/800/400.webp"} alt="Post Hero" fill className="object-cover" unoptimized />
                </div>

                <div className="p-8 pb-6 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-indigo-900/30 text-primary dark:text-cyan-400 text-xs font-bold rounded-full border border-blue-100 dark:border-indigo-800">#{id}</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-emerald-900/20 text-green-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-green-100 dark:border-emerald-800/30" title={d.trustScore}>
                            <ShieldCheck className="w-3.5 h-3.5" /> {d.trustScore}: 98%
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                        {mockData ? `${mockData.story.substring(0, 30)}...` : '1995년 서울역에서 헤어진 동생(김철수)을 찾습니다'}
                    </h1>

                    <div className="flex flex-wrap gap-5 text-sm text-gray-600 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl items-center border border-gray-100 dark:border-slate-700/50">
                        <span onClick={simulateAdminApproval} className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 p-1 rounded transition" title="데모: 관리자 승인 시뮬레이션을 위해 클릭하세요">
                            <strong className="text-gray-900 dark:text-white">{d.author}:</strong> {mockData ? mockData.name : '김영희'} (본인인증 됨)
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-slate-500"><MapPin className="w-4 h-4" /> {mockData ? mockData.location : 'KOR / Asia/Seoul'}</span>
                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-slate-500"><Calendar className="w-4 h-4" /> {mockData ? mockData.date : '2026.04.05'}</span>

                        <button onClick={handleShare} className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm rounded-lg hover:border-primary dark:hover:border-cyan-400 hover:text-primary dark:hover:text-cyan-400 transition font-bold active:scale-95 text-gray-700 dark:text-slate-200">
                            <Share2 className="w-4 h-4" /> 공유하기
                        </button>
                    </div>

                    {/* [보안 마스킹 연락처 영역] - Phase 6 매칭 승인 결과 UI */}
                    {matchStatus !== 'idle' && (
                        <div className={`mt-6 p-5 rounded-2xl border flex items-center justify-between transition-all duration-700 ${matchStatus === 'approved' ? 'bg-green-50 dark:bg-emerald-900/20 border-green-200 dark:border-emerald-800/30' : 'bg-orange-50 dark:bg-amber-900/20 border-orange-200 dark:border-amber-800/30'}`}>
                            <div className="flex flex-col">
                                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${matchStatus === 'approved' ? 'text-green-600 dark:text-emerald-400' : 'text-orange-600 dark:text-amber-400'}`}>
                                    {matchStatus === 'approved' ? 'Match Approved' : 'Pending Verification'}
                                </span>
                                <h3 className={`text-2xl md:text-3xl font-black font-mono tracking-widest transition-all ${matchStatus === 'approved' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-600 blur-[2px] select-none hover:blur-[1px]'}`}>
                                    {matchStatus === 'approved' ? '010-8291-3844' : '010-****-****'}
                                </h3>
                                {matchStatus === 'pending' && <p className="text-xs md:text-sm text-orange-600 dark:text-amber-400 mt-2 font-medium">관리자(Mediator)의 매칭 검증 후에 연락처를 확인하실 수 있습니다.</p>}
                            </div>
                            <div className={`p-4 rounded-full ${matchStatus === 'approved' ? 'bg-white dark:bg-slate-800 shadow-sm ring-4 ring-green-100 dark:ring-emerald-900/40' : 'bg-orange-100 dark:bg-amber-900/40'}`}>
                                {matchStatus === 'approved' ? <Unlock className="w-6 h-6 text-green-500 dark:text-emerald-400" /> : <Lock className="w-6 h-6 text-orange-500 dark:text-amber-400" />}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-slate-300 leading-relaxed text-lg pb-8">
                    {mockData?.audio && (
                        <div className="mb-8 not-prose">
                            <AudioPlayer src={mockData.audio} />
                        </div>
                    )}
                    {mockData ? (
                        <p className="whitespace-pre-line">{mockData.story}</p>
                    ) : (
                        <>
                            <p>1995년 여름, 서울역 광장에서 아이스크림을 사러 간 동생을 마지막으로 보지 못했습니다. 등에 커다란 흉터가 있습니다...</p>
                            <p>가족은 세상에서 가장 따뜻한 이름입니다. 동생아 보고싶다.</p>
                        </>
                    )}
                </div>
            </article>

            {/* Floating UI: Micro-Yes Funnel */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 z-50 flex justify-center ${showFloating || funnelStep > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 p-6 flex flex-col gap-4 animate-fade-in-up transition-colors">

                    {funnelStep === 0 && matchStatus === 'idle' && (
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-500 fill-red-100 dark:fill-red-900/30" />
                                {d.heart}
                            </p>
                            <button onClick={handleNextStep} className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition shadow-sm active:scale-95">
                                매칭 요청하기
                            </button>
                        </div>
                    )}

                    {funnelStep === 0 && matchStatus !== 'idle' && (
                        <div className="flex items-center justify-center p-2 text-gray-500 dark:text-slate-400 font-medium">
                            <ShieldCheck className="w-5 h-5 text-gray-400 dark:text-slate-500 mr-2" />
                            {matchStatus === 'approved' ? '진심으로 가족 상봉을 축하합니다!' : '보안 매칭을 위해 관리자가 검토 중입니다.'}
                        </div>
                    )}

                    {funnelStep === 1 && (
                        <div className="flex flex-col gap-3 animate-fade-in">
                            <label className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary dark:text-cyan-400" />
                                {d.messageTitle}
                            </label>
                            <textarea placeholder={d.messagePlaceholder} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white resize-none h-20 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                            <button onClick={handleNextStep} className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition shadow-sm active:scale-95">
                                다음
                            </button>
                        </div>
                    )}

                    {funnelStep === 2 && (
                        <div className="flex flex-col gap-4 animate-fade-in">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-gray-300 dark:border-slate-700 text-primary focus:ring-primary bg-white dark:bg-slate-800" defaultChecked />
                                <span className="text-gray-700 dark:text-slate-300 font-medium leading-snug">{d.notify} <br /><span className="text-xs text-gray-500 dark:text-slate-500 font-normal">업데이트 시 이메일 수신 동의</span></span>
                            </label>
                            <button onClick={handleNextStep} className="w-full py-3 bg-gray-900 dark:bg-primary text-white rounded-xl font-bold hover:bg-black dark:hover:brightness-110 transition shadow-sm flex justify-center items-center gap-2 active:scale-95">
                                <ShieldCheck className="w-5 h-5" />
                                {d.submit}
                            </button>
                        </div>
                    )}

                    {funnelStep === 3 && (
                        <div className="flex flex-col items-center gap-2 animate-fade-in w-full">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{d.waitingAd}</h3>
                            <AdUnit type="fullscreen" className="!my-0 rounded-xl w-full h-48 md:h-64 dark:opacity-90" />
                            <div className="w-full h-2 mt-4 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-accent animate-[pulse_5s_ease-in-out_forwards] w-full origin-left" style={{ animation: 'pastelFlow 5s linear forwards' }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
