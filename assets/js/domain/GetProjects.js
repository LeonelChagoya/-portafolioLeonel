import { getProjectsFromJson } from '../data/projectsRepository.js';

export async function GetProjects() {
    return await getProjectsFromJson();
}
