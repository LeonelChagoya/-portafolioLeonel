
import { renderAboutMeSection } from './components/AboutMeSection.js';
import { renderSkillsSection } from './components/SkillsSection.js';
import { renderProjectsSection } from './components/ProjectsSection.js';
import { renderContactSection } from './components/ContactSection.js';
import { GetSkills } from './domain/GetSkills.js';

export const routes = {
    '/': async () => renderAboutMeSection(),
    '/abilities': async () => {
        const skills = await GetSkills();
        return renderSkillsSection(skills);
    },
    '/projects': async () => renderProjectsSection(),
    '/contact': async () => renderContactSection()
};
