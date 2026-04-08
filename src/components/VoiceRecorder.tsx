"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

interface VoiceRecorderProps {
    onRecordingComplete: (blob: Blob | null) => void;
    lang?: string;
}

const dict: Record<string, any> = {
    ko: {
        start: "목소리 녹음 시작",
        stop: "녹음 중단",
        play: "재생",
        pause: "일시정지",
        delete: "삭제",
        empty: "아직 녹음된 내용이 없습니다.",
        confirm: "녹음 완료!",
        error: "마이크 권한이 필요합니다.",
    },
    en: {
        start: "Start Voice Recording",
        stop: "Stop Recording",
        play: "Play",
        pause: "Pause",
        delete: "Delete",
        empty: "No recording available yet.",
        confirm: "Recording Complete!",
        error: "Microphone permission is required.",
    },
};

export default function VoiceRecorder({ onRecordingComplete, lang = "ko" }: VoiceRecorderProps) {
    const t = dict[lang] || dict.ko;
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                onRecordingComplete(audioBlob);

                // Stop all tracks to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setError(null);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError(t.error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const deleteRecording = () => {
        setAudioUrl(null);
        onRecordingComplete(null);
        setIsPlaying(false);
        setRecordingTime(0);
    };

    const togglePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 transition-all hover:border-primary/30 group">
            <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mic className={`w-4 h-4 ${isRecording ? "text-red-500 animate-pulse" : "text-primary"}`} />
                    목소리 증거 (Audio Evidence)
                </label>
                {isRecording && (
                    <span className="text-xs font-mono text-red-500 font-bold animate-pulse">
                        REC {formatTime(recordingTime)}
                    </span>
                )}
            </div>

            <div className="flex flex-col items-center justify-center py-4">
                {!audioUrl && !isRecording && (
                    <button
                        type="button"
                        onClick={startRecording}
                        className="flex flex-col items-center gap-3 group/btn"
                    >
                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center border border-gray-100 dark:border-gray-700 group-hover/btn:scale-110 group-hover/btn:border-primary transition-all duration-300">
                            <Mic className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 group-hover/btn:text-primary transition-colors">
                            {t.start}
                        </span>
                    </button>
                )}

                {isRecording && (
                    <button
                        type="button"
                        onClick={stopRecording}
                        className="flex flex-col items-center gap-3 animate-bounce"
                    >
                        <div className="w-16 h-16 bg-red-500 rounded-full shadow-lg shadow-red-200 flex items-center justify-center">
                            <Square className="w-8 h-8 text-white fill-current" />
                        </div>
                        <span className="text-sm font-bold text-red-500">
                            {t.stop}
                        </span>
                    </button>
                )}

                {audioUrl && !isRecording && (
                    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={togglePlayback}
                                className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                            </button>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-green-500" /> {t.confirm}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono">0:00 / {formatTime(recordingTime || 0)}</span>
                                </div>
                                <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-primary transition-all duration-300 ${isPlaying ? 'w-full' : 'w-0'}`} />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={deleteRecording}
                                className="w-8 h-8 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <audio
                            ref={audioRef}
                            src={audioUrl}
                            onEnded={() => setIsPlaying(false)}
                            className="hidden"
                        />
                    </div>
                )}

                {error && (
                    <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 px-3 py-1.5 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {error}
                    </div>
                )}
            </div>

            <p className="mt-4 text-[11px] text-gray-400 text-center leading-relaxed">
                ※ 가족의 목소리나 특징적인 억양은 실종자를 찾는 데 결정적인 단서가 될 수 있습니다.<br />
                녹음된 내용은 암호화되어 안전하게 보관됩니다.
            </p>
        </div>
    );
}
