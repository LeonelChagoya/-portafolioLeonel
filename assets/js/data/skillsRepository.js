import { Skill } from '../core/Skill.js';

export async function getSkillsFromJson() {
    const basePath = window.location.pathname.includes('/-portafolioLeonel/')
        ? '/-portafolioLeonel/'
        : '/';

    const response = await fetch(`${basePath}data/skills.json`);

    const data = await response.json();
    return data.map(item => new Skill(item.nombre, item.nivel));
}
