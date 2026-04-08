"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const aboutDict: Record<string, any> = {
    ko: {
        subtitle: "우리의 이야기",
        title: "가족은 세상에서\n가장 따뜻한 이름입니다.",
        p1: "패밀리본드는 단 하나의 소망에서 시작되었습니다. 헤어진 가족을 찾는 모든 이들이 다시 집으로 돌아갈 수 있기를 바랍니다.",
        p2: "가족의 가치가 희미해져 가는 현대 사회에서, 우리는 기술의 힘과 개인의 작은 용기를 모아 재회의 기적을 만들어갑니다.",
        p3: "여러분의 작은 관심과 제보가, 누군가에게는 잃어버린 가족을 찾는 마지막 퍼즐 조각이 될 수 있습니다.",
        visionTitle: "우리의 비전",
        visionDesc: "우리는 모든 헤어진 가족이 다시 만나는 그날까지 멈추지 않습니다.",
        value1: "신뢰와 보안",
        value1Desc: "모든 정보는 엄격한 검토를 거쳐 안전하게 보호됩니다.",
        value2: "따뜻한 연결",
        value2Desc: "단순한 중개를 넘어 마음과 마음을 잇는 따뜻한 상봉을 지향합니다.",
        value3: "사회적 가치",
        value3Desc: "가족의 회복을 통해 더 따뜻한 사회를 만드는 데 기여합니다.",
        cta: "지금 사연 등록하기"
    },
    en: {
        subtitle: "Our Story",
        title: "Family is the warmest\nname in the world.",
        p1: "FamilyBond began with a single hope: that everyone who has lost a family member can find their back home.",
        p2: "In a modern society where the value of family is often faded, we leverage the power of technology and small courage from individuals to create miracles of reunion.",
        p3: "Your small concern and interest can be the last puzzle piece in a lost family's story.",
        visionTitle: "Our Vision",
        visionDesc: "We will not stop until every lost family is reunited.",
        value1: "Trust & Security",
        value1Desc: "All information is strictly reviewed and securely protected.",
        value2: "Warm Connection",
        value2Desc: "Beyond mediation, we aim for a warm reunion connecting hearts.",
        value3: "Social Value",
        value3Desc: "We contribute to a warmer society through the restoration of family.",
        cta: "Post a Story Now"
    }
};

export default function AboutPage() {
    const { lang } = useParams();
    const d = aboutDict[lang as string] || aboutDict['ko'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            } as any
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            } as any
        }
    };

    return (
        <div className="w-full bg-background transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 dark:opacity-20" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase mb-6"
                    >
                        {d.subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] } as any}
                        className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight md:leading-tight italic mb-8 whitespace-pre-line"
                    >
                        {d.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="w-20 h-1 bg-primary mx-auto rounded-full mb-12"
                    />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-12 text-lg md:text-xl text-gray-700 dark:text-slate-300 leading-relaxed font-light"
                    >
                        <motion.p variants={itemVariants} className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                            {d.p1}
                        </motion.p>
                        <motion.p variants={itemVariants}>
                            {d.p2}
                        </motion.p>
                        <motion.p variants={itemVariants} className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border-l-4 border-primary italic font-medium">
                            {d.p3}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{d.visionTitle}</h2>
                    <p className="text-gray-500 dark:text-slate-400">{d.visionDesc}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: d.value1, desc: d.value1Desc, color: "bg-blue-500" },
                        { icon: Heart, title: d.value2, desc: d.value2Desc, color: "bg-red-500" },
                        { icon: Users, title: d.value3, desc: d.value3Desc, color: "bg-green-500" }
                    ].map((value, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700"
                        >
                            <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                                <value.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-black mb-10 leading-tight">
                        {lang === 'ko' ? '기적의 주인공이 되어보세요' : 'Be the protagonist of a miracle'}
                    </h2>
                    <Link
                        href={`/${lang}/post/new`}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl active:scale-95"
                    >
                        {d.cta}
                        <ArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
}
