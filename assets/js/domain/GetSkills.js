import { getSkillsFromJson } from '../data/skillsRepository.js';

export async function GetSkills() {
    return await getSkillsFromJson();
}
