"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CheckSquare, Users, Settings, Moon, Sun, ArrowLeft, HeartHandshake, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { lang } = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // 다크 모드 초기화 (Tailwind class 기반)
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // 모바일에서 링크 이동 시 사이드바 닫기
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: "Overview", h: `/${lang}/admin`, icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "사연 대기열 (Approval)", h: `/${lang}/admin/posts`, icon: <CheckSquare className="w-5 h-5" /> },
        { name: "매칭 & 신고", h: `/${lang}/admin/matches`, icon: <HeartHandshake className="w-5 h-5" /> },
        { name: "글로벌 유저", h: `/${lang}/admin/users`, icon: <Users className="w-5 h-5" /> },
        { name: "설정", h: `/${lang}/admin/settings`, icon: <Settings className="w-5 h-5" /> }
    ];

    return (
        <div className={`min-h-screen flex flex-col md:flex-row w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
            {/* Mobile Header (Admin) */}
            <div className={`md:hidden flex items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} sticky top-0 z-40`}>
                <h1 className="text-xl font-black tracking-tight text-primary truncate">Mediator<span className="text-accent">Center</span></h1>
                <button onClick={() => setSidebarOpen(true)} className={`p-2 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'}`}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:static inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 w-72 md:w-64 flex-shrink-0 border-r flex flex-col shadow-2xl md:shadow-none ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black tracking-tight flex items-center justify-between">
                            <span className="text-primary truncate">Mediator<span className="text-accent">Center</span></span>
                        </h1>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Admin Workspace</p>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
                    {navLinks.map((item) => {
                        const isActive = pathname === item.h;
                        return (
                            <Link
                                key={item.h}
                                href={item.h}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                    ? (darkMode ? 'bg-gray-800 text-white' : 'bg-primary/10 text-primary')
                                    : (darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <span className="text-sm font-medium">Dark Mode</span>
                        {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </button>

                    <button onClick={() => router.push(`/${lang}`)} className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition font-medium text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        서비스로 돌아가기
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
