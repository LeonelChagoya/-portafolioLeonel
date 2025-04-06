import { dynamicRoutes, routes } from './router.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { loadTranslations, changeLang } from './data/translationsRepository.js';
import { setupLightbox } from './interactions/lightboxHandler.js';
import { setupProjectDetailInteractions } from './interactions/setupProjectDetailInteractions.js';

function getCurrentPath() {
    return window.location.hash.replace(/^#/, '') || '/';
}

async function navigate(path) {
    const main = document.querySelector('main');
    main.classList.add('fade-out');

    await new Promise(resolve => setTimeout(resolve, 300));

    let matched = false;

    if (routes[path]) {
        main.innerHTML = await routes[path]();
        matched = true;
    } else {
        for (const route of dynamicRoutes) {
            const match = path.match(route.pattern);
            if (match) {
                const param = match[1];
                main.innerHTML = await route.render(param);
                matched = true;

                // ⚡ Importante: solo si estamos en vista de proyecto
                if (path.startsWith('/project/')) {
                    setupProjectDetailInteractions();
                    setupLightbox();
                }

                break;
            }
        }
    }

    if (!matched) {
        main.innerHTML = '<h2>404 - Página no encontrada</h2>';
    }

    main.classList.remove('fade-out');
}

function setupNavLinks() {
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const path = link.getAttribute('href').replace(/^#/, '');
            window.location.hash = path;
        });
    });
}

async function renderApp() {
    document.body.innerHTML = '';

    document.body.insertAdjacentHTML('afterbegin', renderHeader());

    const main = document.createElement('main');
    main.innerHTML = `
                      <div class="loader-container">
                        <div class="spinner"></div>
                      </div>
                    `;

    document.body.appendChild(main);

    await navigate(getCurrentPath());

    document.body.insertAdjacentHTML('beforeend', renderFooter());

    setupNavLinks();

    document.getElementById('lang-switcher')?.addEventListener('change', async (e) => {
        changeLang(e.target.value);
        renderApp();
    });
}

window.addEventListener('hashchange', () => {
    navigate(getCurrentPath());
});

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    renderApp();
});
