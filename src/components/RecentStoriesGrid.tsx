"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Share2, Send, Copy, Check, MessageCircleMore } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function RecentStoriesGrid({ initialStories, lang, dict }: { initialStories: any[], lang: string, dict: any }) {
    const [stories, setStories] = useState(initialStories);
    const [activeShare, setActiveShare] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const mockStories = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('mock_post_demo-')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key) || '{}');
                    const id = key.replace('mock_post_', '');
                    mockStories.push({
                        id,
                        title: data.story?.split('\n')[0].substring(0, 30) || '제목 없음',
                        name: data.name,
                        location: data.location,
                        date: data.date,
                        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        image: data.images && data.images.length > 0 ? data.images[0] : (data.image || 'https://picsum.photos/400/200')
                    });
                } catch (e) {
                    console.error("Failed to parse mock post", e);
                }
            }
        }
        mockStories.sort((a, b) => b.id.localeCompare(a.id));
        if (mockStories.length > 0) {
            setStories([...mockStories, ...initialStories]);
        }
    }, [initialStories]);

    const handleShare = async (story: any, type: 'kakao' | 'fb' | 'copy') => {
        const shareUrl = `${window.location.origin}/${lang}/post/${story.id}`;
        // UPGRADE_REQUIRED: 실제 사연 제목/텍스트를 SNS API 연동 지점으로 활용하세요.
        const shareText = `${story.name}님을 찾는 사연입니다. 소중에 기적이 되길 바랍니다.`;

        if (type === 'copy') {
            await navigator.clipboard.writeText(shareUrl);
            setCopiedId(story.id);
            setTimeout(() => setCopiedId(null), 2000);
            return;
        }

        if (type === 'kakao') {
            // @ts-ignore
            if (window.Kakao && window.Kakao.isInitialized()) {
                // @ts-ignore
                window.Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: 'FamilyBond - 가족을 찾습니다',
                        description: shareText,
                        imageUrl: story.image,
                        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
                    },
                    buttons: [{ title: '사연 보기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
                });
            } else {
                alert(`[DEMO] 카카오톡으로 사연 전파 시뮬레이션\nURL: ${shareUrl}`);
            }
            return;
        }

        if (type === 'fb') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
            return;
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {stories.map(story => (
                <motion.div key={story.id} variants={item} className="group/card relative" onMouseEnter={() => setActiveShare(story.id)} onMouseLeave={() => setActiveShare(null)}>
                    <AnimatePresence>
                        {activeShare === story.id && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-xl p-4 flex justify-around items-center border-t border-border z-20 rounded-b-2xl shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(254, 229, 0, 0.6))" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleShare(story, 'kakao')}
                                    className="p-3 bg-[#FEE500] text-[#3c1e1e] rounded-full shadow-lg border border-yellow-200"
                                    title="카카오톡 공유"
                                >
                                    <MessageCircleMore size={20} fill="currentColor" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(24, 119, 242, 0.6))" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleShare(story, 'fb')}
                                    className="p-3 bg-[#1877F2] text-white rounded-full shadow-lg border border-blue-400/30"
                                    title="페이스북 공유"
                                >
                                    <Send size={20} fill="currentColor" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleShare(story, 'copy')}
                                    className="p-3 bg-background text-foreground rounded-full shadow-lg border border-border"
                                    title="링크 복사"
                                >
                                    {copiedId === story.id ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Link
                        href={`/${lang}/post/${story.id}`}
                        className="group flex flex-col bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary/50 h-full"
                    >
                        <div className="relative w-full h-56 overflow-hidden">
                            <Image src={story.image || "https://picsum.photos/400/200"} alt="Story image" fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    사연 상세보기 <ArrowRight className="w-4 h-4 text-accent" />
                                </span>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="glass px-3 py-1.5 rounded-full text-[10px] font-black text-primary dark:text-accent uppercase tracking-wider shadow-sm border border-white/20">
                                    {story.location}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1 justify-between bg-card relative">
                            <div>
                                <h3 className="text-xl font-black text-foreground dark:text-white group-hover:text-primary line-clamp-2 mb-4 leading-tight transition-colors">
                                    {story.title}
                                </h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                        <span className="text-sm font-black text-primary uppercase">
                                            {story.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-foreground/50 dark:text-slate-400 uppercase tracking-widest leading-none mb-1">{dict.post?.author || '찾는 이'}</span>
                                        <span className="text-sm font-black text-foreground dark:text-slate-200">{story.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                <div className="flex items-center gap-2 text-foreground/60 dark:text-slate-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-bold">{story.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-foreground/60 dark:text-slate-400">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-bold">{story.location.split(' ')[0]}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
