import { t } from '../data/translationsRepository.js';

export function renderAboutMeSection() {
    return `
    <section id="aboutMe">
      <h2>${t('aboutMeTitle')}</h2>
      <p>${t('aboutMeText')}</p>
    </section>
  `;
}
