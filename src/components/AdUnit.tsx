"use client";
import React, { useState, useEffect } from 'react';

interface AdUnitProps {
    className?: string;
    type?: 'banner' | 'fullscreen';
}

export default function AdUnit({ className = '', type = 'banner' }: AdUnitProps) {
    const isFullScreen = type === 'fullscreen';
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 1초 후 스켈레톤 사라지고 광고 로딩 가정
        const timer = setTimeout(() => setIsLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`relative flex items-center justify-center border border-dashed rounded-lg overflow-hidden transition-colors ${isLoaded ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-300 animate-pulse'
                } ${isFullScreen ? 'w-full h-[300px] md:h-[400px] my-6' : 'w-full h-[100px] md:h-[120px] my-4'
                } ${className}`}
            aria-label="Advertisement space"
        >
            {!isLoaded ? (
                <div className="flex flex-col items-center gap-3">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mb-1">
                        ✨ PARTNER ADVERTISEMENT ✨
                    </span>
                    <span className="text-sm text-[#6b7280]">
                        {isFullScreen ? 'Global AdSense Full-Screen Area' : 'AdSense Banner Display Space'}
                    </span>
                </div>
            )}
        </div>
    );
}
