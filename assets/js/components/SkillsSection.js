import { t } from '../data/translationsRepository.js';

export function renderSkillsSection(skills) {
    let list = skills.map(skill => `<li>${skill.nombre} - ${skill.nivel}</li>`).join('');
    return `
    <section id="abilities">
      <h2>${t('skillsTitle')}</h2>
      <ul>${list}</ul>
    </section>
  `;
}
