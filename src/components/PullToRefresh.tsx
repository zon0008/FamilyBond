"use client";
import React, { useState, useEffect, TouchEvent } from "react";
import { Loader2 } from "lucide-react";

export default function PullToRefresh({ children }: { children: React.ReactNode }) {
    const [startY, setStartY] = useState(0);
    const [isPulling, setIsPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleTouchStart = (e: TouchEvent) => {
        if (window.scrollY === 0) {
            setStartY(e.touches[0].clientY);
            setIsPulling(true);
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isPulling || isRefreshing) return;
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0) {
            setPullDistance(Math.min(diff * 0.5, 100)); // easing formula
        }
    };

    const handleTouchEnd = () => {
        if (!isPulling || isRefreshing) return;
        setIsPulling(false);

        if (pullDistance > 60) {
            setIsRefreshing(true);
            // Simulate network refresh or router.refresh()
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setPullDistance(0);
        }
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full relative touch-pan-y"
        >
            <div
                className="absolute top-0 left-0 right-0 flex justify-center transition-transform duration-200 will-change-transform z-40 relative"
                style={{ transform: `translateY(${pullDistance}px)`, height: pullDistance > 0 ? pullDistance : 0, overflow: 'hidden' }}
            >
                {pullDistance > 0 && (
                    <div className="mt-4 bg-white rounded-full p-2 shadow-lg w-10 h-10 flex items-center justify-center">
                        <Loader2 className={`w-6 h-6 text-primary ${isRefreshing ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullDistance * 2}deg)` }} />
                    </div>
                )}
            </div>

            <div
                className="transition-transform duration-200"
                style={{ transform: `translateY(${isRefreshing ? 60 : pullDistance}px)` }}
            >
                {children}
            </div>
        </div>
    );
}
