import { Skill } from '../core/Skill.js';

export async function getSkillsFromJson() {
    const basePath = window.location.href.includes('leonelchagoya')
        ? '/portafolioLeonelV/#/'
        : '/#/';
    console.log(window.location.href.includes('abi'));
    const response = await fetch(`${basePath}data/skills.json`);
    const data = await response.json();
    return data.map(item => new Skill(item.nombre, item.nivel));
}
