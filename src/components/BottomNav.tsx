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
                <nav className="glass rounded-[2rem] px-2 md:px-4 py-2 flex items-center justify-around shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-border">
                    {navLinks.map((item) => {
                        const isActive = pathname === item.href && !item.isPrimary;

                        if (item.isPrimary) {
                            return (
                                <Link key={item.name} href={item.href} className="relative -top-7 group">
                                    <motion.div
                                        whileHover={{ scale: 1.1, translateY: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-16 h-16 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center shadow-[0_8px_25px_var(--primary-glow)] border-4 border-background active:shadow-inner transition-shadow"
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-black text-primary bg-background px-2 py-0.5 rounded-full shadow-sm border border-border">
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        }

                        return (
                            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center py-2 relative group flex-1">
                                <motion.div
                                    animate={isActive ? { y: -1, scale: 1.15 } : { y: 0, scale: 1 }}
                                    className={`${isActive ? 'text-primary' : 'text-foreground/40'} transition-colors duration-300`}
                                >
                                    {item.icon}
                                </motion.div>
                                <span className={`text-[9px] mt-1 font-black tracking-tight transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground/40'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"
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
