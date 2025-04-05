import { Skill } from '../core/Skill.js';
import { resolvePath } from '../utils/resolvePath.js';

export async function getSkillsFromJson() {
    const response = await fetch(resolvePath('data/skills.json'));
    const data = await response.json();
    return data.map(item => new Skill(item.nombre, item.nivel));
}
