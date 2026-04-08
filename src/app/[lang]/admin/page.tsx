"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, MousePointerClick, DollarSign, Headphones, Mic } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";

// Mock global data
const trafficData = [
    { name: 'Mon', active: 4000, new: 2400 }, { name: 'Tue', active: 5000, new: 1398 },
    { name: 'Wed', active: 8000, new: 9800 }, { name: 'Thu', active: 6780, new: 3908 },
    { name: 'Fri', active: 9890, new: 4800 }, { name: 'Sat', active: 11390, new: 3800 },
    { name: 'Sun', active: 14490, new: 4300 },
];

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-6 animate-fade-in-up">
            <h2 className="text-3xl font-extrabold mb-2 dark:text-white">Command Overview</h2>

            {/* Top Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Global Active Users</p>
                            <h3 className="text-3xl font-black dark:text-white mt-1">128,401</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+14.2%</span>
                        <span className="text-xs text-gray-400">vs last week</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-2xl text-red-500 dark:text-red-400">
                            <MousePointerClick className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">5-Sec Funnel Retention</p>
                            <h3 className="text-3xl font-black dark:text-white mt-1">89.4%</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+2.1%</span>
                        <span className="text-xs text-gray-400">High micro-yes conversion</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-2xl text-green-600 dark:text-green-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Est. Revenue (AdSense)</p>
                            <h3 className="text-3xl font-black dark:text-white mt-1">$14,230</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+41.2%</span>
                        <span className="text-xs text-gray-400">Due to global scale</span>
                    </div>
                </div>
            </div>

            {/* Traffic Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mt-4 flex flex-col min-h-[400px]">
                <h3 className="text-xl font-bold mb-8 dark:text-white flex items-center justify-between">
                    Weekly Global Traffic
                    <span className="text-xs font-normal bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full">Live Updates</span>
                </h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trafficData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="active" stroke="#2563eb" fillOpacity={1} fill="url(#colorActive)" strokeWidth={4} activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Audio Evidence Clips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                    <h3 className="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-primary" />
                        Recent Audio Evidence
                    </h3>
                    <div className="flex flex-col gap-4">
                        <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" label="ID: #demo-123 (Kim Chul-su)" />
                        <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" label="ID: #demo-456 (John Doe)" />
                    </div>
                </div>

                <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform">
                        <Mic className="w-32 h-32" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Voice Proof Upgrade</h3>
                    <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                        가족들의 목소리 데이터를 분석하여 <br />
                        인공지능(AI) 유사도 검증 모델이 활성화되었습니다.
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold">Active</div>
                        <div className="text-xs text-blue-200">92.4% Verification Accuracy</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
