const termsDict: Record<string, any> = {
    ko: {
        title: "서비스 이용약관 및 개인정보처리방침",
        tosTitle: "1. 서비스 이용약관 (Terms of Service)",
        tosIntro: "FamilyBond (이하 '서비스')는 잃어버린 가족을 찾고 재회를 지원하는 인도주의적 플랫폼입니다.",
        tosLists: [
            "사용자는 실제 사실에 기반한 정확한 정보만을 게시해야 하며, 허위 사실 유포 시 서비스 이용이 제한될 수 있습니다.",
            "서비스 내 광고(Google AdSense)에 대한 부정 클릭 및 비정상적인 조작 행위는 엄격히 금지됩니다.",
            "본 서비스는 등록된 정보의 진위 여부를 보증하지 않습니다. 매칭된 정보의 최종 확인 및 상봉 결정에 따른 책임은 전적으로 사용자 본인에게 있습니다.",
            "타인의 권리 침해나 부적절한 콘텐츠 게시 시 예고 없이 삭제될 수 있으며 법적 책임이 발생할 수 있습니다."
        ],
        privacyTitle: "2. 개인정보처리방침 (Privacy Policy)",
        privacyIntro: "본 서비스는 사용자의 개인정보 보호를 최우선으로 하며, 관련 법령 및 글로벌 표준을 준수합니다.",
        privacyLists: [
            "<strong>수집 항목</strong>: 성명(닉네임), 신체적 특징, 사연 관련 사진, 위치 데이터(지역 정보), 소셜 로그인 정보(이메일 등).",
            "<strong>처리 목적</strong>: 가족 찾기 매칭 시스템 운영, 관리자 중개 승인 및 본인 확인, 고객 문의 대응.",
            "<strong>데이터 공유 및 위탁</strong>: 안정적인 서비스 제공을 위해 Supabase (데이터베이스 관리) 및 Vercel (웹 호스팅) 인프라를 이용합니다. 수집된 정보는 마케팅 목적으로 제3자에게 판매되지 않습니다.",
            "<strong>이용자 권리</strong>: 사용자는 언제든지 본인의 데이터에 대한 열람, 수정 및 삭제(탈퇴)를 요청할 수 있습니다. 요청은 <a href='mailto:sinusung@naver.com' class='text-primary hover:underline'>sinusung@naver.com</a>으로 문의해 주시기 바랍니다.",
            "<strong>쿠키 및 광고</strong>: 본 서비스는 Google AdSense를 이용하며, Google 및 제3자 공급업체는 사용자의 방문 기록을 기반으로 맞춤형 광고를 제공하기 위해 쿠키를 사용합니다. 사용자는 <a href='https://myadcenter.google.com/' target='_blank' rel='noreferrer' class='text-primary hover:underline'>Google 광고 설정</a>에서 이를 제어할 수 있습니다."
        ]
    },
    en: {
        title: "Terms of Service & Privacy Policy",
        tosTitle: "1. Terms of Service",
        tosIntro: "FamilyBond (hereinafter 'Service') is a humanitarian platform dedicated to finding and reuniting separated families.",
        tosLists: [
            "Users must provide accurate, factual information; spreading false information may lead to restricted access.",
            "Fraudulent clicks or abnormal manipulation of in-service advertisements (Google AdSense) are strictly prohibited.",
            "This service does not guarantee the authenticity of registered information. The final verification of matched data and any decisions regarding reunions are the sole responsibility of the user.",
            "Any content infringing on others' rights or deemed inappropriate may be deleted without notice, and the user may be held legally liable."
        ],
        privacyTitle: "2. Privacy Policy",
        privacyIntro: "We prioritize user privacy and comply with relevant laws and global standards.",
        privacyLists: [
            "<strong>Data Collection</strong>: Name (nickname), physical characteristics, story-related photos, location data (region), and social login info (email).",
            "<strong>Purpose of Processing</strong>: Operating the family matching system, administrator-mediated approvals, identity verification, and customer support.",
            "<strong>Data Sharing & Entrustment</strong>: We utilize Supabase (Database) and Vercel (Hosting) infrastructure for stable service. Your data is never sold to third parties for marketing purposes.",
            "<strong>User Rights</strong>: You have the right to access, rectify, or request the deletion of your data at any time. For such requests, please contact <a href='mailto:sinusung@naver.com' class='text-primary hover:underline'>sinusung@naver.com</a>.",
            "<strong>Cookies & Ads</strong>: We use Google AdSense. Google and third-party vendors use cookies to serve personalized ads based on your visit history. You can manage this via <a href='https://myadcenter.google.com/' target='_blank' rel='noreferrer' class='text-primary hover:underline'>Google Ads Settings</a>."
        ]
    },
    es: {
        title: "Términos de Servicio y Política de Privacidad",
        tosTitle: "1. Términos de Servicio",
        tosIntro: "FamilyBond (en adelante 'Servicio') tiene como objetivo facilitar el intercambio de información para encontrar familias separadas.",
        tosLists: [
            "Los usuarios no deben proporcionar información falsa ni publicar contenido que difame a otros.",
            "Hacer clics fraudulentos en los anuncios (ej. Google AdSense) está estrictamente prohibido.",
            "El servicio no garantiza la exactitud de la información proporcionada ni asume responsabilidad legal."
        ],
        privacyTitle: "2. Política de Privacidad",
        privacyIntro: "Este servicio cumple con las políticas del programa de Google AdSense.",
        privacyLists: [
            "Usamos cookies de Google y proveedores asociados para mostrar anuncios personalizados.",
            "Puede rechazar las cookies de publicidad personalizada a través de la <a href='https://myadcenter.google.com/' target='_blank' rel='noreferrer' class='text-primary hover:underline'>Configuración de anuncios de Google</a>.",
            "La información recopilada se utiliza exclusivamente para reunir familias y no se cede comercialmente."
        ]
    }
};

export default async function TermsPage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const lang = params.lang || 'ko';

    // Fallback to English if language is not explicitly defined in the dictionary yet
    const t = termsDict[lang] || termsDict['en'];

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-foreground mb-8">{t.title}</h1>

            <div className="bg-card backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-border space-y-8 text-muted-foreground leading-relaxed text-sm transition-colors">
                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4">{t.tosTitle}</h2>
                    <p className="mb-2">{t.tosIntro}</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {t.tosLists.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4">{t.privacyTitle}</h2>
                    <p className="mb-2">{t.privacyIntro}</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {t.privacyLists.map((item: string, idx: number) => (
                            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
