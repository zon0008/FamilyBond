"use client";
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from "react";
import AdUnit from "@/components/AdUnit";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, Heart, ShieldCheck, Mail, Lock, Unlock, Share2, ChevronLeft, ChevronRight, Copy, Check, MessageCircleMore, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import { createBrowserClient } from "@supabase/ssr";
import { motion, AnimatePresence } from "framer-motion";

const clientDict: Record<string, any> = {
    ko: {
        back: "목록으로 돌아가기", trustScore: "신뢰도 지수", author: "찾는 이", heart: "가족이라고 생각되시나요?",
        messageTitle: "정확한 증빙이나 특징을 적어주세요", messagePlaceholder: "예: 어릴 적 사진, 상처 위치 등...",
        notify: "매칭 결과 알림 받기", submit: "관리자 검토 요청하기", waitingAd: "안전한 연결망을 준비 중입니다...",
        spreadTheWord: "이 사연을 더 널리 알려주세요", shareKakao: "카카오톡 공유", shareFb: "페이스북 공유", copyLink: "링크 복사"
    },
    en: {
        back: "Back to list", trustScore: "Trust Score", author: "Looking for", heart: "Is this your family?",
        messageTitle: "Provide proof or specific features", messagePlaceholder: "e.g., childhood photos, scars...",
        notify: "Get matched updates", submit: "Request Admin Review", waitingAd: "Securing connection...",
        spreadTheWord: "Spread the Word", shareKakao: "Share to Kakao", shareFb: "Share to Facebook", copyLink: "Copy Link"
    },
    es: {
        back: "Volver", trustScore: "Confianza", author: "Buscando", heart: "¿Es esta tu familia?",
        messageTitle: "Proporciona pruebas o marcas únicas", messagePlaceholder: "ej. fotos de infancia, cicatrices...",
        notify: "Recibir estado del match", submit: "Solicitar revisión", waitingAd: "Asegurando conexión...",
        spreadTheWord: "Difunde la palabra", shareKakao: "Compartir en Kakao", shareFb: "Compartir en Facebook", copyLink: "Copiar enlace"
    }
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
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    // 워크플로우 매칭 상태 ('idle', 'pending', 'approved')
    const [matchStatus, setMatchStatus] = useState<'idle' | 'pending' | 'approved'>('idle');

    useEffect(() => {
        if (typeof id === 'string') {
            if (id === 'mother-hero') {
                setMockData({
                    name: lang === 'ko' ? '최주영' : 'J. Choi',
                    story: lang === 'ko'
                        ? "어머니, 화면 속 인자하게 웃고 계신 당신의 얼굴을 보니 가슴 한구석이 아려옵니다. 책상 한편에 어머니 함을 모셔두고, 그 곁에 '어머니'라고 적힌 작은 메모지를 붙여두었습니다. 매일 마주하는 이 글자 하나가 왜 이토록 무겁고도 따뜻한지 모르겠습니다.\n\n생전 어머니께 \"사랑한다\"는 말 한마디 제대로 건네지 못했던 못난 자식은, 이제야 텅 빈 입력창 앞에서 \"어머니 사랑합니다\"라고 겨우 적어 내려갑니다. 그 뒤에 차마 다 잇지 못했던 말은 사실 \"죄송합니다\"였습니다. 더 자주 찾아뵙지 못한 것, 맛있는 음식을 함께 나누지 못한 것, 그리고 당신의 고단한 손을 한 번 더 잡아드리지 못한 모든 순간이 후회로 남았습니다.\n\n비록 지금은 제 마음을 전할 수 없지만, 이 간절한 마음 바람을 타고 어머니 계신 곳까지 닿기를 바랍니다. 어머니, 그곳에서는 부디 아픔 없이 평안하시기만을 기도합니다. 당신이 제게 주신 조건 없는 사랑을 기억하며, 저 또한 당신의 자랑스러운 자식으로 꿋꿋하게 살아가겠습니다. 사무치게 보고 싶습니다."
                        : "Mother, your kind face smiling on the screen fills my heart with sorrow. I keep your urn on one side of my desk, with a small note that says 'Mother' next to it. I don't know why this single word I face every day feels so heavy yet warm.\n\nI was a child who couldn't even say \"I love you\" properly while you were alive, and only now am I managing to write it in this empty input box. The words I couldn't finish were actually \"I'm sorry.\" Not visiting more often, not sharing delicious food, and every moment I couldn't hold your tired hands again remains a regret.\n\nThough I cannot convey my heart now, I hope this earnest wish reaches you on the wind. Mother, I pray you are at peace without any pain. Remembering the unconditional love you gave me, I will live on steadfastly as your proud child. I miss you dearly.",
                    location: lang === 'ko' ? '대한민국' : 'South Korea',
                    date: '2026. 4. 8.',
                    images: ['/mother_hero.png?v=1.7'],
                    audio: null
                });
            } else if (id.startsWith('demo-')) {
                const saved = localStorage.getItem(`mock_post_${id}`);
                if (saved) {
                    setMockData(JSON.parse(saved));
                }
            }
        }

        const handleScroll = () => setShowFloating(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    const [copied, setCopied] = useState(false);

    const handleSnsShare = (type: 'kakao' | 'fb' | 'copy') => {
        const url = window.location.href;
        const text = mockData ? mockData.story : "FamilyBond - 가족을 찾습니다";

        if (type === 'kakao') {
            // @ts-ignore
            const K = window.Kakao;
            if (K) {
                try {
                    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '641031350a454d4554303351d3886562';
                    if (!K.isInitialized()) K.init(appKey);

                    const finalUrl = `https://family-bond-final.vercel.app/${lang}/post/${id}`;
                    const finalLink = { mobileWebUrl: finalUrl, webUrl: finalUrl };

                    K.Share.sendDefault({
                        objectType: 'feed',
                        content: {
                            title: 'FamilyBond - 소중한 인연',
                            description: text.substring(0, 100),
                            imageUrl: 'https://family-bond-final.vercel.app/mother_hero.png?v=1.7',
                            link: finalLink,
                        },
                        buttons: [{ title: '사연 보기', link: finalLink }]
                    });
                } catch (e) {
                    console.error("Kakao share error in detail page:", e);
                }
            } else {
                alert(`[DEMO] 카카오톡으로 사연을 전파합니다.\n\n공유 텍스트: ${text.substring(0, 50)}...`);
            }
        } else if (type === 'fb') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

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
            handleSnsShare('copy');
        }
    };

    const handleNextStep = async () => {
        if (funnelStep === 2) {
            setFunnelStep(3);
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
                setMatchStatus('pending');
                setFunnelStep(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 5000);
        } else {
            setFunnelStep(prev => prev + 1);
        }
    };

    const simulateAdminApproval = () => {
        setMatchStatus('approved');
        setTimeout(() => {
            alert(`[System 알림] \n매칭 관리자가 두 분의 가족 관계를 승인했습니다!\n보안 마스킹이 해제되어 진짜 연락처가 교환됩니다.`);
        }, 100);
    };

    const images = mockData?.images || (mockData?.image ? [mockData.image] : ["https://picsum.photos/800/400.webp"]);
    const nextImage = () => setCurrentImgIdx((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-8 relative">
            <div className="flex items-center justify-between mb-8">
                <Link href={`/${lang}`} className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {d.back}
                </Link>
                <Link href={`/${lang}/post/new`} className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold rounded-xl transition shadow-sm text-sm group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                    {lang === 'ko' ? '사연 남기기' : 'Post a Story'}
                </Link>
            </div>

            {mockData && (
                <article className="bg-[#ffffff] !important rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-colors mb-12">
                    <div className="relative w-full h-72 md:h-[500px] bg-gray-100 border-b border-gray-100 group/carousel">
                        <Image src={images[currentImgIdx]} alt="Main Story" fill className="object-cover" unoptimized priority />
                        {mockData.audio && (
                            <div className="absolute bottom-6 left-6 right-6 z-10">
                                <AudioPlayer src={mockData.audio} />
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-14 flex flex-col gap-12">
                        <div className="flex flex-col gap-8 border-b border-gray-100 pb-10">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-4 py-1.5 bg-[#1a1a1a]/5 text-[#1a1a1a]/60 text-[11px] font-black uppercase tracking-widest rounded-full border border-[#1a1a1a]/10">
                                    # {id}
                                </span>
                                <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[11px] font-black uppercase tracking-widest rounded-full border border-green-100 flex items-center gap-2">
                                    <Heart className="w-4 h-4 fill-green-600" />
                                    {lang === 'ko' ? '신뢰도 지수: 100%' : 'Trust Score: 100%'}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-[#1a1a1a] !important leading-[1.1] tracking-tighter" style={{ textWrap: 'balance' }}>
                                {mockData.title || (lang === 'ko' ? '어머니, 화면 속 인자하게 웃고 계신 당신의 얼굴을 보니 가슴 한구석이 아려옵니다' : 'Mother, your kind face smiling on the screen fills my heart with sorrow')}
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/80 p-8 rounded-[2rem] border border-gray-100">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black text-[#1a1a1a]/40 uppercase tracking-widest">{lang === 'ko' ? '찾는 이' : 'Poster'}</span>
                                    <span className="text-base font-bold text-[#1a1a1a]">{mockData.name}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black text-[#1a1a1a]/40 uppercase tracking-widest">{lang === 'ko' ? '위치' : 'Location'}</span>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-[#1a1a1a]/40" />
                                        <span className="text-base font-bold text-[#1a1a1a]">{mockData.location}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black text-[#1a1a1a]/40 uppercase tracking-widest">{lang === 'ko' ? '날짜' : 'Date'}</span>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-[#1a1a1a]/40" />
                                        <span className="text-base font-bold text-[#1a1a1a]">{mockData.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="text-xl md:text-2xl text-[#1a1a1a] !important font-medium leading-[1.9] whitespace-pre-wrap tracking-tight">
                                {mockData.story}
                            </div>
                        </div>

                        {matchStatus !== 'idle' && (
                            <div className={`p-8 rounded-[2.5rem] border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-1000 ${matchStatus === 'approved' ? 'bg-green-50 border-green-200 shadow-2xl shadow-green-200/20' : 'bg-amber-50 border-amber-200'}`}>
                                <div className="flex flex-col text-center md:text-left">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${matchStatus === 'approved' ? 'text-green-600' : 'text-amber-600'}`}>
                                        {matchStatus === 'approved' ? 'Identity Verified' : 'Checking for Match'}
                                    </span>
                                    <h3 className={`text-3xl md:text-4xl font-black tracking-tighter text-[#1a1a1a] ${matchStatus !== 'approved' && 'blur-[4px] select-none opacity-40'}`}>
                                        {matchStatus === 'approved' ? '010-8291-3844' : '010-****-****'}
                                    </h3>
                                </div>
                                <div className={`p-6 rounded-full ${matchStatus === 'approved' ? 'bg-white shadow-xl' : 'bg-amber-100 animate-pulse'}`}>
                                    {matchStatus === 'approved' ? <Unlock className="w-8 h-8 text-green-500" /> : <Lock className="w-8 h-8 text-amber-500" />}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-[#1a1a1a] text-white rounded-[1.5rem] text-lg font-black hover:bg-black transition-all shadow-xl active:scale-95">
                                <Share2 className="w-6 h-6" />
                                {lang === 'ko' ? '이 사연 공유하기' : 'Share this Story'}
                            </button>
                            <button onClick={simulateAdminApproval} className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-[#1a1a1a] rounded-[1.5rem] text-lg font-black border-2 border-[#1a1a1a]/10 hover:border-[#1a1a1a] transition-all active:scale-95">
                                <ShieldCheck className="w-6 h-6" />
                                {lang === 'ko' ? '관리자용 매칭 승인' : 'Admin: Approve'}
                            </button>
                        </div>
                    </div>
                </article>
            )}

            <div className="p-10 relative overflow-hidden rounded-[3rem] border border-gray-100 bg-gray-50/50 mb-32">
                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 bg-[#FEE500] rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-yellow-200">
                        <MessageCircleMore className="w-8 h-8 text-[#3c1e1e] fill-current" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a]">{d.spreadTheWord}</h2>
                        <p className="text-[#1a1a1a]/60 text-base font-medium leading-relaxed max-w-sm">
                            {lang === 'ko' ? '공유 한 번이 누군가에게는 평생의 기적이 됩니다. 우리 사회의 따뜻한 관심을 모아주세요.' : 'One share can be a miracle for someone. Please gather warm attention from our society.'}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
                        <button onClick={() => handleSnsShare('kakao')} className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-[#FEE500] text-[#3c1e1e] font-black rounded-2xl shadow-lg border border-yellow-200 hover:-translate-y-1 transition-all">
                            <MessageCircleMore className="w-6 h-6 fill-current" />
                            {d.shareKakao}
                        </button>
                        <button onClick={() => handleSnsShare('copy')} className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#1a1a1a] font-black rounded-2xl shadow-lg border border-gray-200 hover:-translate-y-1 transition-all">
                            {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                            {d.copyLink}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`fixed bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 z-50 flex justify-center ${showFloating || funnelStep > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="w-full max-w-2xl bg-[#ffffff] rounded-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] border border-gray-100 p-8 flex flex-col gap-6">
                    {funnelStep === 0 && matchStatus === 'idle' && (
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex flex-col gap-1">
                                <p className="font-black text-[#1a1a1a] text-xl flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                                    {d.heart}
                                </p>
                                <p className="text-sm text-[#1a1a1a]/40 font-bold uppercase tracking-widest">Connect your family bonding</p>
                            </div>
                            <button onClick={handleNextStep} className="px-10 py-5 bg-[#1a1a1a] text-white font-black rounded-2xl hover:bg-black transition shadow-xl active:scale-95">
                                {lang === 'ko' ? '매칭 요청하기' : 'Request Match'}
                            </button>
                        </div>
                    )}
                    {funnelStep === 0 && matchStatus !== 'idle' && (
                        <div className="flex items-center justify-center p-2 text-[#1a1a1a]/60 font-black tracking-tight">
                            <ShieldCheck className="w-6 h-6 text-green-500 mr-3" />
                            {matchStatus === 'approved' ? '진심으로 가족 상봉을 축하드립니다!' : '보안 매칭을 위해 관리자가 검토 중입니다.'}
                        </div>
                    )}
                    {funnelStep === 1 && (
                        <div className="flex flex-col gap-5 animate-fade-in">
                            <label className="font-black text-[#1a1a1a] text-xl flex items-center gap-3">
                                <Mail className="w-6 h-6 text-primary" />
                                {d.messageTitle}
                            </label>
                            <textarea placeholder={d.messagePlaceholder} className="w-full p-5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary bg-gray-50 text-[#1a1a1a] font-bold resize-none h-32 placeholder:text-gray-300" />
                            <button onClick={handleNextStep} className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-lg hover:bg-black transition shadow-xl active:scale-95">
                                {lang === 'ko' ? '다음 단계로' : 'Next Step'}
                            </button>
                        </div>
                    )}
                    {funnelStep === 2 && (
                        <div className="flex flex-col gap-6 animate-fade-in">
                            <label className="flex items-start gap-4 cursor-pointer p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all">
                                <input type="checkbox" className="w-6 h-6 mt-1 rounded-full border-gray-300 text-primary focus:ring-primary" defaultChecked />
                                <div className="flex flex-col">
                                    <span className="text-[#1a1a1a] font-black text-lg leading-tight">{d.notify}</span>
                                    <span className="text-sm text-[#1a1a1a]/40 font-bold">{lang === 'ko' ? '업데이트 시 이메일 수신 동의' : 'Agree to receive status updates'}</span>
                                </div>
                            </label>
                            <button onClick={handleNextStep} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:brightness-110 transition shadow-2xl shadow-primary/30 flex justify-center items-center gap-3 active:scale-95">
                                <ShieldCheck className="w-7 h-7" />
                                {d.submit}
                            </button>
                        </div>
                    )}
                    {funnelStep === 3 && (
                        <div className="flex flex-col items-center gap-6 animate-fade-in w-full py-4 text-center">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-black text-[#1a1a1a] text-2xl">{d.waitingAd}</h3>
                                <p className="text-[#1a1a1a]/40 font-bold text-sm">준비가 완료될 때까지 잠시만 기다려주세요</p>
                            </div>
                            <AdUnit type="banner" className="!my-0 rounded-2xl w-full h-32 border border-gray-100" />
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-pulse w-full origin-left" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
