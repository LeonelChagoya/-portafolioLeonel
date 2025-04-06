import { t } from '../data/translationsRepository.js';

export function renderAboutMeSection() {
    return `
    <section id="aboutMe">
      <h2>${t('aboutMeTitle')}</h2>
      <p>${t('aboutMeText')}</p>
      <h3>Actualización de prueba para activar Jenkins CI prueba 2</h3>
    </section>
  `;
}
