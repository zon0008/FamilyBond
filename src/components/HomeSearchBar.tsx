"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";

export default function HomeSearchBar({ placeholder, lang }: { placeholder: string, lang: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
                e.preventDefault();
                inputRef.current?.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query) {
            router.push(`/${lang}/search/process?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-2xl relative group"
        >
            <div className={`relative flex items-center transition-all duration-500 rounded-[2.5rem] p-1.5 ${isFocused ? 'bg-indigo-600/10 dark:bg-indigo-400/10 shadow-[0_20px_60px_rgba(79,70,229,0.15)] dark:shadow-[0_20px_60px_rgba(79,70,229,0.3)] scale-[1.02]' : 'bg-white dark:bg-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.06)]'}`}>
                <div className="flex-1 flex items-center px-4 md:px-6">
                    <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={lang === 'ko' ? '이름 또는 특징 입력' : placeholder}
                        className="w-full py-5 px-3 md:px-4 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm md:text-base pr-2"
                    />
                </div>

                <div className="absolute right-24 md:right-28 hidden sm:flex items-center gap-1 opacity-40 pointer-events-none">
                    <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-black tracking-tighter dark:text-slate-400 text-slate-500">CTRL K</kbd>
                </div>

                <button
                    type="submit"
                    className="btn-premium px-6 md:px-10 py-5 text-white rounded-[2rem] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 group-active:scale-95 shadow-xl transition-all"
                >
                    <span className="hidden xs:inline">{lang === 'ko' ? '찾기' : 'Find'}</span>
                    <Search className="w-4 h-4" />
                </button>
            </div>

            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="absolute top-full left-0 right-0 mt-4 p-6 glass dark:bg-slate-900/90 rounded-[2rem] shadow-2xl z-20 border border-white/40 dark:border-slate-800 transition-all"
                    >
                        <p className="text-[10px] font-black text-indigo-500 dark:text-cyan-400 uppercase tracking-[0.2em] mb-4 text-center">주요 키워드로 찾기</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['동생 찾기', '박영수', '서울역', '보육원', '실종', '재회'].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setQuery(tag)}
                                    className="px-5 py-2.5 bg-white/50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-cyan-500 text-slate-600 dark:text-slate-300 rounded-full text-xs font-black transition-all border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-indigo-200 dark:hover:shadow-cyan-400/30 hover:-translate-y-0.5"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.form>
    );
}
