import { GetProjects } from '../domain/GetProjects.js';
import { ProjectCard } from './ProjectCard.js';
import { t } from '../data/translationsRepository.js';

export async function renderProjectsSection() {
    const proyectos = await GetProjects();
    const cards = proyectos.length > 0
        ? proyectos.map(p => ProjectCard(p)).join('')
        : `<p>${t('projectEmpty')}</p>`;

    return `
    <section id="projects">
      <h2>${t('projectsTitle')}</h2>
      <div class="projects-grid">
        ${cards}
      </div>
    </section>
  `;
}
