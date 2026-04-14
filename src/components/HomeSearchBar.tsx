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
            <div className={`relative flex items-center transition-all duration-500 rounded-[2.5rem] p-1.5 ${isFocused ? 'bg-primary/10 shadow-[0_20px_60px_var(--ring)] scale-[1.02]' : 'bg-background shadow-[0_10px_40px_rgba(0,0,0,0.06)]'}`}>
                <div className="flex-1 flex items-center px-4 md:px-6">
                    <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-foreground/30'}`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={lang === 'ko' ? '이름 또는 특징 입력' : placeholder}
                        className="w-full py-5 px-3 md:px-4 bg-transparent border-none focus:outline-none focus:ring-0 text-foreground font-bold placeholder:text-foreground/20 text-sm md:text-base pr-2"
                    />
                </div>

                <div className="absolute right-24 md:right-28 hidden sm:flex items-center gap-1 opacity-40 pointer-events-none">
                    <kbd className="px-1.5 py-0.5 bg-foreground/5 border border-border rounded text-[10px] font-black tracking-tighter text-foreground/40">CTRL K</kbd>
                </div>

                <button
                    type="submit"
                    className="btn-premium px-6 md:px-10 py-5 text-background font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 group-active:scale-95 shadow-xl transition-all"
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
                        className="absolute top-full left-0 right-0 mt-4 p-6 glass rounded-[2rem] shadow-2xl z-20 border border-border transition-all"
                    >
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 text-center text-background">주요 키워드로 찾기</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['동생 찾기', '박영수', '서울역', '보육원', '실종', '재회'].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setQuery(tag)}
                                    className="px-5 py-2.5 bg-background/50 hover:bg-primary hover:text-white text-foreground/70 rounded-full text-xs font-black transition-all border border-border shadow-sm hover:shadow-primary/30 hover:-translate-y-0.5"
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
