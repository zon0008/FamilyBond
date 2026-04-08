"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, Download, Headphones } from "lucide-react";

interface AudioPlayerProps {
    src: string;
    label?: string;
}

export default function AudioPlayer({ src, label = "목소리 증거 (Voice Evidence)" }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-white/10 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Headphones className="w-16 h-16 text-white" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{label}</span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={togglePlay}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 text-gray-900 fill-current" />
                        ) : (
                            <Play className="w-6 h-6 text-gray-900 fill-current ml-1" />
                        )}
                    </button>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-mono text-white font-medium">{formatTime(currentTime)}</span>
                            <span className="text-sm font-mono text-gray-400">{formatTime(duration)}</span>
                        </div>

                        <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-200"
                                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                            />
                        </div>
                    </div>

                    <a
                        href={src}
                        download="evidence-audio.wav"
                        className="p-3 text-gray-400 hover:text-white transition-colors"
                        title="Download Evidence"
                    >
                        <Download className="w-5 h-5" />
                    </a>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6">
                    <div className="flex gap-1 h-3 items-end">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 rounded-full bg-blue-400/40 transition-all duration-300 ${isPlaying ? 'animate-waveform' : 'h-1'}`}
                                style={{
                                    height: isPlaying ? `${Math.random() * 100}%` : '4px',
                                    animationDelay: `${i * 0.1}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
            />

            <style jsx>{`
        @keyframes waveform {
          0%, 100% { height: 4px; }
          50% { height: 100%; }
        }
        .animate-waveform {
          animation: waveform 0.6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
