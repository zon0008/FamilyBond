"use client";
import React from "react";

export default function LanguageSelector({ currentLang }: { currentLang: string }) {
    return (
        <div className="relative">
            <select
                aria-label="Select Language"
                className="appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-1.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-semibold transition-colors"
                defaultValue={currentLang}
                onChange={(e) => {
                    if (typeof window !== 'undefined') window.location.href = `/${e.target.value}`;
                }}
            >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
                <option value="ru">Русский</option>
                <option value="ar">العربية</option>
                <option value="hi">हिन्दी</option>
                <option value="vi">Tiếng Việt</option>
            </select>
        </div>
    );
}
