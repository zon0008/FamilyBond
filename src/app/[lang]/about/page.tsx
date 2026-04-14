"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import RecentStoriesGrid from "@/components/RecentStoriesGrid";

const aboutDict: Record<string, any> = {
    ko: {
        subtitle: "우리의 이야기",
        title: "가족은 세상에서<br/>가장 따뜻한 이름입니다.",
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
        cta: "지금 사연 등록하기",
        recentTitle: "최근 등록된 사연",
        recentDesc: "함께 나누고 지지하는 기적의 이야기들입니다."
    },
    en: {
        subtitle: "Our Story",
        title: "Family is the warmest<br/>name in the world.",
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
        cta: "Post a Story Now",
        recentTitle: "Recent Stories",
        recentDesc: "Stories of miracles that we share and support together."
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
            <section className="relative min-h-[70vh] flex items-center justify-center py-20 md:py-32 overflow-hidden px-6">
                {/* Aurora Background Layer */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 dark:bg-primary/30 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
                    <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[80px] mix-blend-screen animate-bounce [animation-duration:8s]" />
                    <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] bg-cyan-400/20 dark:bg-cyan-400/30 rounded-full blur-[60px] mix-blend-screen animate-pulse [animation-duration:12s]" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10 w-full px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative p-1 rounded-[3.5rem] bg-gradient-to-tr from-primary/20 via-white/5 to-indigo-500/20 backdrop-blur-3xl shadow-2xl dark:shadow-primary/5 border border-white/20 dark:border-white/10 overflow-hidden"
                    >
                        {/* Glass Inner Layer */}
                        <div className="bg-white/80 dark:bg-slate-900/60 rounded-[3.3rem] p-6 md:p-16 lg:p-20 backdrop-blur-md relative overflow-hidden">
                            {/* Decorative Sparkle Effects */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="inline-block px-5 py-2 rounded-full bg-indigo-50 dark:bg-primary/20 text-indigo-700 dark:text-cyan-400 text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-10 border border-indigo-100 dark:border-primary/20 shadow-sm"
                            >
                                {d.subtitle}
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.25] tracking-tighter italic drop-shadow-sm break-keep"
                            >
                                <span
                                    className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent block px-4"
                                    dangerouslySetInnerHTML={{ __html: d.title }}
                                />
                            </motion.h1>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 flex flex-col items-center gap-6"
                    >
                        <div className="w-1 md:w-1.5 h-16 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50" />
                        <p className="text-muted-foreground font-medium tracking-widest text-sm uppercase animate-pulse">
                            {lang === 'ko' ? '기적의 순간을 함께합니다' : 'Moments of miracles together'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-background dark:bg-slate-950 transition-colors">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-16 text-lg md:text-2xl text-foreground leading-relaxed font-medium"
                    >
                        <motion.p variants={itemVariants} className="first-letter:text-6xl first-letter:font-black first-letter:text-indigo-600 dark:first-letter:text-accent first-letter:mr-4 first-letter:float-left first-letter:mt-2">
                            {d.p1}
                        </motion.p>
                        <motion.p variants={itemVariants}>
                            {d.p2}
                        </motion.p>
                        <motion.p variants={itemVariants} className="bg-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-border shadow-sm italic font-bold text-foreground relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                            {d.p3}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-4">{d.visionTitle}</h2>
                    <p className="text-muted-foreground">{d.visionDesc}</p>
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
                            className="bg-card dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-border"
                        >
                            <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                                <value.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
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

            {/* Recent Stories Grid - Added for Image Consistency */}
            <section className="py-24 bg-background transition-colors">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{d.recentTitle}</h2>
                            <p className="text-muted-foreground font-medium">{d.recentDesc}</p>
                        </div>
                    </div>
                    {/* UPGRADE_REQUIRED: 실제 데이터 연동 시 stories prop을 전달하세요 */}
                    <RecentStoriesGrid initialStories={[
                        { id: '1', name: lang === 'ko' ? '최주영' : 'J. Choi', title: lang === 'ko' ? '어머니, 화면 속 인자하게 웃고 계신 당신의 얼굴을 보며' : 'Mother, looking at your kind face smiling on the screen', date: '2026. 4. 8.', location: lang === 'ko' ? '대한민국' : 'South Korea', image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop' },
                        { id: '2', name: lang === 'ko' ? '김영희' : 'Y. Kim', title: lang === 'ko' ? '1995년 서울역에서 헤어진 동생을 찾습니다' : 'Looking for my brother lost at Seoul Station in 1995', date: '2026.04.05', location: lang === 'ko' ? '서울특별시' : 'Seoul', image: 'https://images.unsplash.com/photo-1542128962-9d50ad7bf714?q=80&w=800&auto=format&fit=crop' },
                        { id: '3', name: lang === 'ko' ? '박지은' : 'J. Park', title: lang === 'ko' ? '가슴에 점이 있는 오빠(박철수)를 찾아요' : 'Looking for my brother (Chul-su Park) with a mole on his chest', date: '2026.04.04', location: lang === 'ko' ? '부산광역시' : 'Busan', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' }
                    ]} lang={lang as string} dict={{}} />
                </div>
            </section>
        </div>
    );
}
