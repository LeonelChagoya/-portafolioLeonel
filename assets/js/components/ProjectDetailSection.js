
import { GetProjects } from '../domain/GetProjects.js';
import { getCurrentLang, t } from '../data/translationsRepository.js';

export async function renderProjectDetailSection(projectId) {
    const projects = await GetProjects();
    const lang = getCurrentLang();
    const project = projects.find(p => p.id === projectId);

    if (!project) return `<h2>404 - Proyecto no encontrado</h2>`;

    const imagenes = project.getImagenes();

    const thumbnails = imagenes.map((img, idx) =>
        `<img src="${img}" class="thumbnail ${idx === 0 ? 'selected' : ''}" data-full="${img}" data-index="${idx}" alt="Preview ${idx}"/>`
    ).join('');


    const techTags = project.tecnologias
        .map(tech => `<span class="tech">${tech}</span>`)
        .join('');

    return `
    <section id="project-detail">
      <h2>${project.getTitulo(lang)}</h2>

      <div class="main-image-wrapper">
        <button class="arrow" id="arrow-left">&#10094;</button>
        <img src="${imagenes[0]}" alt="Vista principal" id="main-image" class="main-image"/>
        <button class="arrow" id="arrow-right">&#10095;</button>
      </div>

      <div class="project-thumbnails">${thumbnails}</div>

      <p><strong>${t('projectRole')}:</strong> ${project.getRol(lang)}</p>
      <p><strong>${t('projectChallenges')}:</strong> ${project.getRetos(lang)}</p>

      <div class="tech-tags">${techTags}</div>
      <a href="${project.url}" target="_blank">${t('projectButton')}</a>
    </section>
    <!-- Lightbox -->
<div id="lightbox" class="lightbox hidden">
  <div class="lightbox-content">
    <button id="close-lightbox">×</button>
    <img src="" alt="Vista ampliada" id="lightbox-image"/>
  </div>
</div>

  `;
}
