"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav({ lang }: { lang: string }) {
    const pathname = usePathname();

    const navLinks = [
        { name: "홈", icon: <Home className="w-5 h-5" />, href: `/${lang}` },
        { name: "검색", icon: <Search className="w-5 h-5" />, href: `/${lang}#search` },
        { name: "사연 등록", icon: <PlusCircle className="w-8 h-8 text-white" />, href: `/${lang}/post/new`, isPrimary: true },
        { name: "알림", icon: <Bell className="w-5 h-5" />, href: `/${lang}/settings` },
        { name: "내 정보", icon: <User className="w-5 h-5" />, href: `/${lang}/login` }
    ];

    return (
        <>
            {/* Spacer for bottom nav */}
            <div className="h-24 md:hidden w-full shrink-0" />

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-50 md:hidden">
                <nav className="glass dark:bg-slate-900/80 rounded-[2rem] px-2 md:px-4 py-2 flex items-center justify-around shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-white/40 dark:border-slate-800">
                    {navLinks.map((item) => {
                        const isActive = pathname === item.href && !item.isPrimary;

                        if (item.isPrimary) {
                            return (
                                <Link key={item.name} href={item.href} className="relative -top-7 group">
                                    <motion.div
                                        whileHover={{ scale: 1.1, translateY: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(79,70,229,0.4)] border-4 border-white dark:border-slate-800 active:shadow-inner transition-shadow"
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-black text-indigo-600 bg-white dark:bg-slate-800 dark:text-cyan-400 px-2 py-0.5 rounded-full shadow-sm">
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        }

                        return (
                            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center py-2 relative group flex-1">
                                <motion.div
                                    animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                                    className={`${isActive ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'} transition-colors duration-300`}
                                >
                                    {item.icon}
                                </motion.div>
                                <span className={`text-[9px] mt-1 font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 w-1 h-1 bg-indigo-600 dark:bg-cyan-400 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
