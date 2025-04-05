let translations = {};
let currentLang = localStorage.getItem('lang') || 'es';

export async function loadTranslations() {
    const res = await fetch('data/translations.json');
    translations = await res.json();
}

export function t(key) {
    return translations[currentLang]?.[key] || key;
}

export function changeLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
}

export function getCurrentLang() {
    return currentLang;
}

