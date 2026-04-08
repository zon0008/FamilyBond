"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

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
                        title: data.story.split('\n')[0].substring(0, 30) || '제목 없음',
                        name: data.name,
                        location: data.location,
                        date: data.date,
                        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        image: data.image || 'https://picsum.photos/400/200'
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

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {stories.map(story => (
                <motion.div key={story.id} variants={item}>
                    <Link
                        href={`/${lang}/post/${story.id}`}
                        className="group flex flex-col bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-cyan-900/50 h-full"
                    >
                        <div className="relative w-full h-56 overflow-hidden">
                            <Image src={story.image || "https://picsum.photos/400/200"} alt="Story image" fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    사연 상세보기 <ArrowRight className="w-4 h-4 text-cyan-400" />
                                </span>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="glass dark:bg-slate-900/80 px-3 py-1.5 rounded-full text-[10px] font-black text-indigo-600 dark:text-cyan-400 uppercase tracking-wider shadow-sm border border-white/20">
                                    {story.location}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1 justify-between bg-white dark:bg-slate-900/40 relative">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 line-clamp-2 mb-4 leading-tight transition-colors">
                                    {story.title}
                                </h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-indigo-50 dark:group-hover:bg-cyan-900/20 group-hover:border-indigo-100 dark:group-hover:border-cyan-800 transition-colors">
                                        <span className="text-sm font-black text-indigo-600 dark:text-cyan-400 uppercase">
                                            {story.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{dict.post?.author || '찾는 이'}</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-slate-200">{story.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800/50">
                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-bold">{story.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
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
