import { Skill } from '../core/Skill.js';

export async function getSkillsFromJson() {
    const response = await fetch('data/skills.json');
    const data = await response.json();
    return data.map(item => new Skill(item.nombre, item.nivel));
}
