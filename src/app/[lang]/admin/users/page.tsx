"use client";
import React, { useState } from 'react';
import { ShieldCheck, MapPin, Search, Ban, UserCheck, Languages } from 'lucide-react';

const mockGlobalUsers = [
    { id: '1', name: '김영희', email: 'young***@gmail.com', location: 'Seoul, KOR', lang: 'ko', trustScore: 98, status: 'Verified', date: '2026.04.05' },
    { id: '2', name: 'Alex Murphy', email: 'alex.m***@outlook.com', location: 'Chicago, USA', lang: 'en', trustScore: 85, status: 'Active', date: '2026.04.02' },
    { id: '3', name: 'Ahmed', email: 'ahmed7***@yahoo.com', location: 'Dubai, UAE', lang: 'ar', trustScore: 12, status: 'Suspicious', date: '2026.04.06' },
    { id: '4', name: 'Chen Wei', email: 'chen.w***@qq.com', location: 'Beijing, CHN', lang: 'zh', trustScore: 72, status: 'Active', date: '2026.04.01' },
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState(mockGlobalUsers);

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'Verified': return 'bg-green-100 text-green-700';
            case 'Suspicious': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-extrabold dark:text-white mb-2">글로벌 유저 (Global Users)</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">전 세계에서 접속하는 의뢰인과 서포터들의 계정 건전성 및 지역 분포를 관리합니다.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="이름, 지역, 이메일 검색..." className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-white text-sm w-full sm:w-64" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400">User</th>
                                <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400">Region & Locale</th>
                                <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400">Trust Score</th>
                                <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400">Status</th>
                                <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 flex items-center justify-center font-bold">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                                                <p className="text-xs text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {u.location}</span>
                                            <span className="flex items-center gap-1.5 text-xs text-gray-500 uppercase"><Languages className="w-3.5 h-3.5" /> Locale: {u.lang}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className={`h-full ${u.trustScore > 80 ? 'bg-green-500' : u.trustScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${u.trustScore}%` }} />
                                            </div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">{u.trustScore}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full flex w-max items-center gap-1 ${getStatusBg(u.status)}`}>
                                            {u.status === 'Verified' && <ShieldCheck className="w-3 h-3" />}
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 hover:bg-green-50 text-green-600 hover:text-green-700 rounded-lg transition tooltip" title="수동 본인인증 처리">
                                                <UserCheck className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition tooltip" title="스팸 사용자 차단">
                                                <Ban className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
