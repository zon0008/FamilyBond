"use client";
import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            // Check if already dismissed in session
            if (!sessionStorage.getItem('pwa_prompt_dismissed')) {
                setShowPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        sessionStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed top-16 left-4 right-4 md:hidden z-50 animate-fade-in-up">
            <div className="bg-primary/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-primary/20">
                <div className="flex flex-col">
                    <strong className="text-sm">FamilyBond 앱 설치하기</strong>
                    <span className="text-xs text-indigo-100">홈 화면에 추가하고 빠르게 접속하세요</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleInstall} className="flex items-center gap-1 bg-white text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-sm active:scale-95 transition">
                        <Download className="w-3.5 h-3.5" /> 설치
                    </button>
                    <button onClick={handleDismiss} className="p-1.5 rounded-full hover:bg-white/10 active:scale-90 transition">
                        <X className="w-4 h-4 text-indigo-100" />
                    </button>
                </div>
            </div>
        </div>
    );
}
