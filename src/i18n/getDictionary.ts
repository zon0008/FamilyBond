export const dictionaries = {
    ko: () => import('./dictionaries/ko.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    es: () => import('./dictionaries/es.json').then((module) => module.default),
    ja: () => import('./dictionaries/ja.json').then((module) => module.default),
    zh: () => import('./dictionaries/zh.json').then((module) => module.default),
    ru: () => import('./dictionaries/ru.json').then((module) => module.default),
    ar: () => import('./dictionaries/ar.json').then((module) => module.default),
    hi: () => import('./dictionaries/hi.json').then((module) => module.default),
    vi: () => import('./dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    if (!Object.keys(dictionaries).includes(locale)) {
        return dictionaries.ko();
    }
    return dictionaries[locale as keyof typeof dictionaries]();
};
