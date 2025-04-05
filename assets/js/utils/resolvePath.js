export function resolvePath(relativePath) {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const projectRoot = '/portafolioLeonelV/';
    const base = isGitHubPages ? projectRoot : '/';
    return `${base}${relativePath}`;
}
