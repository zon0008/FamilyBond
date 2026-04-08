"use client";
import React, { useState } from 'react';
import { CheckCircle, XCircle, ShieldBan, ArrowRight, UserCircle2, ArrowRightLeft } from "lucide-react";

// 가상 대기열 데이터 (Demo)
const mockMatches = [
    {
        id: '1',
        postTarget: 'Alex M.', postStory: 'Separated at age 6 in Seoul. Looking for my older sister. I have a picture of her holding a red blanket.',
        requester: 'Sarah M. (Confidence: 98%)', reason: 'I am his biological sister. Here is the family registry ID: 90123... I remember the red blanket.',
        status: 'pending'
    },
    {
        id: '2',
        postTarget: 'Lee Seong-min', postStory: 'Looking for my nephew Do-hyun. Last seen in Busan 20 years ago.',
        requester: 'Lee Do-hyun (Confidence: 85%)', reason: 'This is my uncle. We lost touch 20 years ago. I have a scar on my left arm from an accident.',
        status: 'pending'
    },
];

export default function AdminMatchesQueue() {
    const [matches, setMatches] = useState(mockMatches);

    const handleMatchAction = (id: string, action: 'approved' | 'rejected' | 'revoked') => {
        alert(`[매칭 워크플로우]\n해당 매칭 요청의 상태가 '${action.toUpperCase()}'(으)로 업데이트 되었습니다.\n\n양측 사용자에게 다국어 이메일 푸시 알림이 실시간으로 발송되며, 승인 시 연락처 마스킹(010-****)이 영구 해제됩니다.`);
        setMatches(matches.filter(m => m.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-3xl font-extrabold dark:text-white mb-2">슈퍼 매칭 대기열 (Contact Approval)</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">관리자가 양 당사자의 진정성을 교차 검증하고 민감 연락처를 해제(Unmasking)하는 최상위 관문입니다.</p>
                </div>
                <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-1.5 rounded-full text-sm shrink-0">
                    {matches.length} 건 검토 필요
                </span>
            </div>

            <div className="flex flex-col gap-6">
                {matches.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-16 text-center text-gray-500 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 font-medium flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                        현재 검토 대기 중인 매칭 요청이 없습니다.
                    </div>
                ) : (
                    matches.map((match) => (
                        <div key={match.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col xl:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

                            {/* 좌측: 사연 등록자 데이터 (Original Post) */}
                            <div className="flex-1 p-6 border-b xl:border-b-0 xl:border-r border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4 uppercase text-xs tracking-wider">
                                    <UserCircle2 className="w-4 h-4" /> [원본 사연] 작성자의 정보
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{match.postTarget}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-inner min-h-[100px]">
                                    "{match.postStory}"
                                </p>
                            </div>

                            {/* 중앙 연결고리 아이콘 (데스크톱 전용) */}
                            <div className="hidden xl:flex items-center justify-center -mx-4 z-10">
                                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-lg">
                                    <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
                                </div>
                            </div>

                            {/* 우측: 매칭 요청자 데이터 (Requester) */}
                            <div className="flex-1 p-6 relative">
                                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold mb-4 uppercase text-xs tracking-wider">
                                    <UserCircle2 className="w-4 h-4" /> [요청자] 인연 주장 정보
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{match.requester}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-inner min-h-[100px]">
                                    "{match.reason}"
                                </p>
                            </div>

                            {/* 검토 액션 버튼 패널 */}
                            <div className="flex flex-row xl:flex-col gap-3 p-6 bg-gray-50 dark:bg-gray-900/40 xl:w-56 border-t xl:border-t-0 xl:border-l border-gray-100 dark:border-gray-700 justify-center">
                                <button
                                    onClick={() => handleMatchAction(match.id, 'approved')}
                                    className="flex-1 flex flex-col items-center justify-center gap-2 py-4 px-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition active:scale-95 group"
                                >
                                    <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span>승인 (Unmask)</span>
                                </button>
                                <div className="flex flex-col gap-3 flex-1 h-full justify-between">
                                    <button
                                        onClick={() => handleMatchAction(match.id, 'rejected')}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl transition active:scale-95 text-xs"
                                    >
                                        <XCircle className="w-4 h-4" /> 반려
                                    </button>
                                    <button
                                        onClick={() => handleMatchAction(match.id, 'revoked')}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-2 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-500/30 font-bold rounded-xl transition active:scale-95 text-xs"
                                    >
                                        <ShieldBan className="w-4 h-4" /> 강제 철회
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
