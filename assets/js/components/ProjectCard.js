import { getCurrentLang, t } from '../data/translationsRepository.js';
export function ProjectCard(project) {
    const lang = getCurrentLang();
    const imagen = project.getImagenes()[0];

    return `
    <div class="project-card">
      <img src="${imagen}" alt="${project.getTitulo(lang)}" class="carousel-image"/>
      <h3>${project.getTitulo(lang)}</h3>
      <p>${project.getDescripcion(lang)}</p>
      <a href="#/project/${project.getId()}" class="view-more">${t('projectButton')}</a>
    </div>
  `;
}

