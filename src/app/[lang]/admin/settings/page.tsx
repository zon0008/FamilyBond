"use client";
import React, { useState } from 'react';
import { Settings, Sliders, ShieldAlert, Cpu, Globe, Link as LinkIcon, Database, Check, Languages } from 'lucide-react';

export default function AdminSettingsPage() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="flex flex-col gap-8 animate-fade-in pb-12">
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
                <div>
                    <h2 className="text-3xl font-extrabold dark:text-white mb-2">프랫폼 코어 설정 (App Settings)</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">FamilyBond의 매칭 알고리즘, 지역 접근성, 글로벌 엔진 API 설정을 총괄합니다.</p>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition active:scale-95">
                    {saved ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                    {saved ? '설정 저장 완료' : '변경사항 저장'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. 글로벌 매칭 알고리즘 세팅 */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50 dark:border-gray-700">
                        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                            <Sliders className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">매칭 알고리즘 조건</h3>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="flex items-center justify-between text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                <span>매칭 요청 허용 신뢰도 컷 (Trust Score)</span>
                                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">최소 50%</span>
                            </label>
                            <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-indigo-600" />
                            <p className="text-xs text-gray-500 mt-1.5">이 점수 미만의 유저는 타인의 연락처 해제 요청을 보낼 수 없습니다.</p>
                        </div>
                        <div className="mt-2 flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                            <span className="text-sm font-medium dark:text-gray-300">신규 가입자 48시간 쿨타임 (사기 방지)</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* 2. 지역 및 글로벌 커버리지 */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50 dark:border-gray-700">
                        <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                            <Globe className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">지역 및 IP 차단 (Geofencing)</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 block">허용 국가 (Whitelist Regions)</label>
                            <div className="flex flex-wrap gap-2">
                                {['South Korea (+82)', 'United States (+1)', 'Japan (+81)', 'UAE (+971)', 'Vietnam (+84)'].map(r => (
                                    <span key={r} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 rounded-full">{r}</span>
                                ))}
                                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold border border-gray-200 dark:border-gray-600 rounded-full border-dashed hover:bg-gray-200">+ 추가하기</button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 block">스팸 IP 일괄 차단 레벨</label>
                            <select className="w-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-2.5 text-sm dark:text-white border outline-none">
                                <option>높음 (의심되는 VPN 및 프록시 강제 차단)</option>
                                <option>중간 (알려진 악성 IP만 차단)</option>
                                <option>낮음 (차단 끄기)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. 자동 번역 및 서드파티 엔진 연동 */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm md:col-span-2">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50 dark:border-gray-700">
                        <div className="p-2.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">글로벌 번역 및 서드파티 API 엔진</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-bold dark:text-gray-200"><Languages className="w-4 h-4 text-green-500" /> Google Cloud Translation</div>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Active</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed h-12">사용자가 작성한 한국어 원문 사연을 글로벌 6개국어로 실시간 비동기 번역합니다. 비용이 청구될 수 있습니다.</p>
                            <input type="password" value="********************************" readOnly className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3 py-2 rounded-lg text-sm text-gray-500" />
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-bold dark:text-gray-200"><ShieldAlert className="w-4 h-4 text-orange-500" /> Supabase Edge Functions</div>
                                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">Restart Req.</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed h-12">마이크로-Yes 퍼널의 트래픽을 처리하는 서버리스 함수. 트래픽 폭주 시 스케일업 권장.</p>
                            <button className="w-full py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-bold rounded-lg transition dark:text-white">
                                엔진 재부팅 (Reboot)
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
