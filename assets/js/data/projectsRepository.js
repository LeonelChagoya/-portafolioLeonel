import { Project } from '../core/Project.js';
import { resolvePath } from '../utils/resolvePath.js';

export async function getProjectsFromJson() {
    const response = await fetch(resolvePath('data/projects.json'));
    const data = await response.json();
    return data.map(item => new Project(item));

}
