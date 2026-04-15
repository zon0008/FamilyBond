"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Smartphone, Shield, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import PushNotificationManager from "@/components/PushNotificationManager";

export default function UserSettingsPage() {
    const { lang } = useParams();
    const isKorean = lang === 'ko';
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [matchAlerts, setMatchAlerts] = useState(true);
    const [newStoryAlerts, setNewStoryAlerts] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const saveSettings = () => {
        alert(isKorean ? "알림 설정이 브라우저에 연동되었습니다." : "Notification settings synced with browser.");
    };

    if (!mounted) return null;

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8 relative pb-32">
            <Link href={`/${lang}`} className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isKorean ? "돌아가기" : "Back"}
            </Link>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-slate-800">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-primary" />
                    {isKorean ? "앱 설정 및 테마" : "App Settings & Theme"}
                </h1>

                <div className="flex flex-col gap-8">
                    {/* Theme Selection */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-widest">{isKorean ? "테마 모드 설정" : "Theme Mode Settings"}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'light', name: isKorean ? '라이트' : 'Light', icon: <Sun className="w-5 h-5" /> },
                                { id: 'dark', name: isKorean ? '다크' : 'Dark', icon: <Moon className="w-5 h-5" /> },
                                { id: 'system', name: isKorean ? '시스템' : 'System', icon: <Monitor className="w-5 h-5" /> }
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setTheme(mode.id)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${theme === mode.id
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-500'
                                        }`}
                                >
                                    {mode.icon}
                                    <span className="text-xs font-bold">{mode.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100 dark:border-slate-800" />

                    {/* Push Notification Section */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-widest">{isKorean ? "알림 서비스" : "Notification Service"}</h3>
                        <PushNotificationManager />
                    </div>

                    {/* Sub-Checkboxes (Visual implementation for current requirements) */}
                    <div className="flex flex-col gap-5 bg-gray-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex flex-col text-left">
                                <span className="font-bold text-gray-800 dark:text-slate-200">{isKorean ? "매칭 성공 알림" : "Match Success Alerts"}</span>
                                <span className="text-xs text-gray-500 dark:text-slate-300 mt-1">{isKorean ? "누군가 내 사연에 매칭을 요청했을 때" : "When someone requests a match for your story"}</span>
                            </div>
                            <input type="checkbox" className="w-5 h-5 text-primary rounded border-gray-300 dark:border-slate-600 focus:ring-primary" checked={matchAlerts} onChange={(e) => setMatchAlerts(e.target.checked)} />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex flex-col text-left">
                                <span className="font-bold text-gray-800 dark:text-slate-200">{isKorean ? "새로운 소식" : "New Updates"}</span>
                                <span className="text-xs text-gray-500 dark:text-slate-300 mt-1">{isKorean ? "FamilyBond의 공지사항 및 업데이트" : "Announcements and updates from FamilyBond"}</span>
                            </div>
                            <input type="checkbox" className="w-5 h-5 text-primary rounded border-gray-300 dark:border-slate-600 focus:ring-primary" checked={newStoryAlerts} onChange={(e) => setNewStoryAlerts(e.target.checked)} />
                        </label>
                    </div>

                    <button onClick={saveSettings} className="mt-4 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] flex justify-center items-center gap-2">
                        <Save className="w-5 h-5" /> {isKorean ? "설정 저장 및 동기화" : "Save & Sync Settings"}
                    </button>

                    <p className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center gap-1 font-medium italic">
                        <Shield className="w-3 h-3" /> Encrypted Web Push Communication
                    </p>
                </div>
            </div>
        </div>
    );
}
