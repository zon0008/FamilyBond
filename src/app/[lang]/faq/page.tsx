"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

const faqDict: Record<string, any> = {
    ko: {
        title: "자주 묻는 질문",
        subtitle: "패밀리본드에 대해 궁금한 점을 해결해 드립니다.",
        items: [
            { q: "사연을 어떻게 등록하나요?", a: "홈 화면 헤더의 '사연 남기기' 버튼을 클릭하여 안내에 따라 사연을 작성하실 수 있습니다. 사진과 특징을 최대한 상세히 적어주시면 매칭 확률이 높아집니다." },
            { q: "이용 요금이 있나요?", a: "아니요, 패밀리본드는 100% 무료로 운영됩니다. 가족 상봉이라는 인도적 목적을 위해 운영되는 플랫폼으로, 어떠한 수수료나 비용도 요구하지 않습니다." },
            { q: "개인정보는 어떻게 보호되나요?", a: "모든 지도는 SSL 암호화로 보호됩니다. 또한 연락처와 같은 민감 정보는 마스킹 처리되며, 관리자의 엄격한 서류 검토가 완료된 후에만 상대방에게 제한적으로 공개됩니다." },
            { q: "매칭 프로세스는 어떻게 진행되나요?", a: "일치하는 정보가 발견되면 관리자가 사실 관계(당시 상황, 흉터, 유전자 정보 등)를 확인합니다. 검증이 완료되면 양측의 동의 하에 안전한 오프라인 상봉을 도와드립니다." },
            { q: "의심되는 가족을 발견하면 어떻게 하죠?", a: "사연 상세 페이지 하단의 '매칭 요청하기' 버튼을 눌러 본인의 연락처와 증거 자료를 남겨주세요. 관리자가 내용을 검토한 후 연락을 드립니다." },
            { q: "등록한 사연을 수정하거나 삭제할 수 있나요?", a: "네, 로그인 후 '내 정보' 또는 사연 관리 메뉴에서 본인이 작성한 사연을 언제든지 수정하거나 비공개 처리할 수 있습니다." },
            { q: "해외에서도 이용 가능한가요?", a: "네, 패밀리본드는 전 세계 어디에서나 접속 가능하며 영어, 스페인어 등 다양한 언어를 지원하여 해외 입양아나 해외 거주 실종 가족도 찾을 수 있습니다." },
            { q: "관리자 검토는 얼마나 걸리나요?", a: "보통 사연 등록 후 24~48시간 이내에 첫 검토가 이루어집니다. 다만, 매칭 확인을 위한 심층 검증 단계는 사례에 따라 수일에서 수주가 소요될 수 있습니다." },
            { q: "어떤 증거 자료를 올리는 것이 좋나요?", a: "어릴 적 사진, 특징적인 흉터나 점의 위치, 당시 입었던 옷의 색상, 그리고 목소리(음성 녹음) 자료가 매우 중요합니다." },
            { q: "패밀리본드를 어떻게 후원할 수 있나요?", a: "저희는 금전적 후원을 받지 않습니다. 대신 등록된 사연을 SNS에 공유해주셔서 더 많은 분들이 볼 수 있게 도와주시는 것이 가장 큰 후원입니다." }
        ]
    },
    en: {
        title: "Frequently Asked Questions",
        subtitle: "We answer your questions about FamilyBond.",
        items: [
            { q: "How do I register a story?", a: "Click the 'Post a Story' button in the home screen header to start the registration process. Providing detailed photos and features increases the matching probability." },
            { q: "Are there any service fees?", a: "No, FamilyBond is 100% free of charge. We operate as a humanitarian platform for family reunion and never request any fees or commissions." },
            { q: "How is my personal information protected?", a: "All communication is protected by SSL encryption. Sensitive info like contacts is masked and only disclosed after strict administrative document review and verification." },
            { q: "How does the matching process work?", a: "When matching info is found, administrators verify records (context, scars, genetic info, etc.). Once verified, we facilitate a safe offline reunion with mutual consent." },
            { q: "What should I do if I find a suspected family member?", a: "Click the 'Request Match' button at the bottom of the story detail page and leave your contact and evidence. An administrator will contact you after review." },
            { q: "Can I edit or delete my registered story?", a: "Yes, you can edit or set your story to private at any time through 'My Profile' or the story management menu after logging in." },
            { q: "Is this service available abroad?", a: "Yes, FamilyBond is accessible worldwide and supports multiple languages including English and Spanish to help adoptees and families residing overseas." },
            { q: "How long does the verification take?", a: "Typically, initial review takes 24-48 hours. However, the in-depth matching verification stage may take from days to weeks depending on the case." },
            { q: "What kind of evidence is best to upload?", a: "Childhood photos, locations of characteristic scars or moles, clothes colors at the time, and voice recordings (audio) are extremely crucial clues." },
            { q: "How can I support FamilyBond?", a: "We do not accept monetary donations. Instead, the greatest support is sharing our stories on social media so more people can see them." }
        ]
    }
};

export default function FAQPage() {
    const { lang } = useParams();
    const d = faqDict[lang as string] || faqDict['ko'];
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
                >
                    {d.title}
                </motion.h1>
                <p className="text-gray-500 dark:text-slate-400 text-lg">{d.subtitle}</p>
            </div>

            <div className="space-y-4">
                {d.items.map((item: any, idx: number) => (
                    <div
                        key={idx}
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-white dark:bg-slate-800 shadow-xl border-primary/20 ring-1 ring-primary/10' : 'bg-white/50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700 hover:border-primary/20'}`}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full px-6 py-6 flex items-center justify-between text-left group"
                        >
                            <span className="flex items-center gap-4">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${openIndex === idx ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                    {idx + 1}
                                </span>
                                <span className={`font-bold text-lg md:text-xl transition-colors ${openIndex === idx ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-400'}`}>
                                    {item.q}
                                </span>
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                className={`text-gray-400 ${openIndex === idx ? 'text-primary' : ''}`}
                            >
                                <ChevronDown />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="px-6 pb-6 pt-2 ml-12">
                                        <div className="p-5 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-l-4 border-primary text-gray-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                                            {item.a}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="mt-20 p-8 rounded-[2.5rem] bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">더 궁금하신 점이 있으신가요?</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-sm">고객센터 문의하기를 통해 직접 문의하실 수 있습니다.</p>
                    </div>
                </div>
                <Link
                    href={`/${lang}/contact`}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg active:scale-95 whitespace-nowrap"
                >
                    1:1 문의하기
                </Link>
            </div>
        </div>
    );
}
