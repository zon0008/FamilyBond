"use client";
import React, { useState } from 'react';
import { CheckCircle, XCircle, EyeOff, ShieldAlert, Mic } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import VoiceRecorder from "@/components/VoiceRecorder";

// 데모용 가짜 pending 사연 데이터
const mockQueue = [
    { id: '1', author: 'Alex Murphy', target: 'John Murphy', loc: 'USA / NA', time: '2 mins ago', story: 'We got separated at the train station... I have a picture of his scar.', audio: null },
    { id: '2', author: 'Kim Min-su', target: 'Kim Ji-yoon', loc: 'KOR / Seoul', time: '1 hour ago', story: 'She was wearing a red sweater and carrying a black backpack.', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
];

export default function AdminPostsQueue() {
    const [queue, setQueue] = useState(mockQueue);
    const [upgradingId, setUpgradingId] = useState<string | null>(null);

    const handleAction = async (id: string, action: 'approve' | 'reject' | 'blind') => {
        // ...
        alert(`[DB Audit] 해당 사연의 상태가 '${action.toUpperCase()}'(으)로 변경되며 Audit Log에 기록되었습니다.`);
        setQueue(queue.filter(q => q.id !== id));
    };

    const handleAudioUpgrade = (id: string, blob: Blob | null) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            setQueue(queue.map(q => q.id === id ? { ...q, audio: url } : q));
            setUpgradingId(null);
            alert("[System] 목소리 증거가 성공적으로 업그레이드 되었습니다!");
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            {/* ... title section ... */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-extrabold dark:text-white">사연 승인 대기열 (Approval Queue)</h2>
                <span className="bg-red-100 text-red-600 font-bold px-4 py-1.5 rounded-full text-sm">
                    {queue.length} 건 대기 중
                </span>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {queue.length === 0 ? (
                    <div className="p-16 text-center text-gray-500 font-medium flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                        모든 사연이 검토 완료되었습니다.
                    </div>
                ) : (
                    queue.map((item, i) => (
                        <div key={item.id} className={`p-6 flex flex-col gap-6 transition hover:bg-gray-50 dark:hover:bg-gray-800/50 ${i !== queue.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded">Target: {item.target}</span>
                                        <span className="text-xs text-gray-400">{item.loc} • {item.time}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-tight">작성자: <span className="text-primary">{item.author}</span></h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-3xl mb-4">{item.story}</p>

                                    {/* Audio Evidence Section */}
                                    <div className="mt-4">
                                        {item.audio ? (
                                            <div className="max-w-md">
                                                <AudioPlayer src={item.audio} label="등록된 목소리 증거" />
                                            </div>
                                        ) : upgradingId === item.id ? (
                                            <div className="max-w-md animate-fade-in-up">
                                                <VoiceRecorder onRecordingComplete={(blob) => handleAudioUpgrade(item.id, blob)} />
                                                <button onClick={() => setUpgradingId(null)} className="mt-2 text-xs text-gray-400 hover:text-gray-600 underline">취소</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setUpgradingId(item.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition border border-blue-100"
                                            >
                                                <Mic className="w-3.5 h-3.5" /> 오디오 증거 업그레이드 (Voice Upgrade)
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-2 min-w-[140px]">
                                    <button onClick={() => handleAction(item.id, 'approve')} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-sm transition active:scale-95 text-sm">
                                        <CheckCircle className="w-4 h-4" /> 승인 (Approve)
                                    </button>
                                    <button onClick={() => handleAction(item.id, 'reject')} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl transition active:scale-95 text-sm">
                                        <XCircle className="w-4 h-4" /> 반려 (Reject)
                                    </button>
                                    <button onClick={() => handleAction(item.id, 'blind')} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl transition active:scale-95 text-sm">
                                        <EyeOff className="w-4 h-4" /> 블라인드 (Blind)
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
