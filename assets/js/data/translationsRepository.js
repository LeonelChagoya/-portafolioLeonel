import { resolvePath } from '../utils/resolvePath.js';

let translations = {};
let currentLang = 'es';

export async function loadTranslations() {
    const res = await fetch(resolvePath('data/translations.json'));
    translations = await res.json();
}

export function t(key) {
    return translations[currentLang]?.[key] || key;
}

export function changeLang(lang) {
    currentLang = lang;
}

export function getCurrentLang() {
    return currentLang;
}
