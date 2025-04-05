import { t, getCurrentLang } from '../data/translationsRepository.js';

export function renderHeader() {
    return `
    <header>
      <h1>Leonel Chagoya</h1>
      <p>${t('subtitle')}</p>
      <nav>
        <a href="/" data-link>${t('aboutMeTitle')}</a>
        <a href="/abilities" data-link>${t('skillsTitle')}</a>
        <a href="/projects" data-link>${t('projectsTitle')}</a>
        <a href="/contact" data-link>${t('contactTitle')}</a>
        <select id="lang-switcher">
          <option value="es" ${getCurrentLang() === 'es' ? 'selected' : ''}>ES</option>
          <option value="en" ${getCurrentLang() === 'en' ? 'selected' : ''}>EN</option>
        </select>
      </nav>
    </header>
  `;
}
