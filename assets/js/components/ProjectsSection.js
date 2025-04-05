import { t } from '../data/translationsRepository.js';

export function renderProjectsSection() {
    return `
    <section id="proyectos">
      <h2>${t('projectsTitle')}</h2>
      <p>${t('projectsText')}</p>
    </section>
  `;
}
