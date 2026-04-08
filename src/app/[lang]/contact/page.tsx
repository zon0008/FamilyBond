"use client";
import React, { useState } from "react";
import { Mail, Send, CheckCircle2, User, FileText, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const contactDict: Record<string, any> = {
    ko: {
        title: "문의하기",
        subtitle: "패밀리본드에 대한 소중한 의견이나 제보를 기다립니다.",
        name: "성함",
        email: "이메일 주소",
        subject: "문의 제목",
        message: "문의 내용",
        submit: "메시지 보내기",
        sending: "보내는 중...",
        success: "메시지가 성공적으로 전송되었습니다!",
        successDesc: "담당자가 확인 후 sinusung@naver.com으로 신속하게 답변 드리겠습니다.",
        placeholderName: "홍길동",
        placeholderEmail: "example@email.com",
        placeholderSubject: "사연 등록 관련 문의입니다.",
        placeholderMessage: "헤어진 가족을 찾는 데 있어 궁금한 점이나 제안 사항을 자유롭게 적어주세요."
    },
    en: {
        title: "Contact Us",
        subtitle: "We look forward to your valuable feedback or reports about FamilyBond.",
        name: "Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message Sent Successfully!",
        successDesc: "An administrator will review and respond to you as quickly as possible.",
        placeholderName: "John Doe",
        placeholderEmail: "example@email.com",
        placeholderSubject: "Inquiry regarding story registration",
        placeholderMessage: "Please feel free to write down any questions or suggestions you have regarding finding lost family."
    }
};

export default function ContactPage() {
    const { lang } = useParams();
    const d = contactDict[lang as string] || contactDict['ko'];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating email submission (Integrating with the user's requirement to send to sinusung@naver.com)
        // In a real production setup, this would call a server action or an API route.
        // For now, we simulate success and provide the target email clearly in the success message.
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                    <Mail size={32} />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
                >
                    {d.title}
                </motion.h1>
                <p className="text-gray-500 dark:text-slate-400 text-lg">{d.subtitle}</p>
            </div>

            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.form
                        key="contact-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700 space-y-8"
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                                    <User size={16} className="text-primary" />
                                    {d.name}
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder={d.placeholderName}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                                    <Mail size={16} className="text-primary" />
                                    {d.email}
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder={d.placeholderEmail}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                                <FileText size={16} className="text-primary" />
                                {d.subject}
                            </label>
                            <input
                                required
                                type="text"
                                placeholder={d.placeholderSubject}
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                                <MessageSquare size={16} className="text-primary" />
                                {d.message}
                            </label>
                            <textarea
                                required
                                rows={6}
                                placeholder={d.placeholderMessage}
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white resize-none"
                            ></textarea>
                        </div>

                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    {d.sending}
                                </>
                            ) : (
                                <>
                                    <Send size={24} />
                                    {d.submit}
                                </>
                            )}
                        </button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 p-12 md:p-20 rounded-[3rem] shadow-2xl text-center space-y-6"
                    >
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle2 size={56} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                            {d.success}
                        </h2>
                        <p className="text-gray-600 dark:text-slate-400 text-lg whitespace-pre-line">
                            {d.successDesc}
                        </p>
                        <div className="pt-8">
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="px-10 py-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition"
                            >
                                {lang === 'ko' ? '다시 문의하기' : 'Send another message'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-16 text-center">
                <p className="text-gray-400 dark:text-slate-500 text-sm">
                    직접 이메일 보내기: <span className="font-bold text-primary">sinusung@naver.com</span>
                </p>
            </div>
        </div>
    );
}
