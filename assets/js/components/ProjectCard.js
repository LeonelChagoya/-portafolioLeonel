import { getCurrentLang, t } from '../data/translationsRepository.js';

export function ProjectCard(project) {
    const lang = getCurrentLang();
    return `
    <div class="project-card">
      <h3>${project.getTitulo(lang)}</h3>
      <p>${project.getDescripcion(lang)}</p>
      <a href="${project.url}" target="_blank">${t('projectButton')}</a>
    </div>
  `;
}
