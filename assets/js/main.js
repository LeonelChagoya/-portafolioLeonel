
import { routes } from './router.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { loadTranslations, changeLang } from './data/translationsRepository.js';

function getCurrentPath() {
    return window.location.hash.replace(/^#/, '') || '/';
}

async function navigate(path) {
    const main = document.querySelector('main');
    main.classList.add('fade-out');

    await new Promise(resolve => setTimeout(resolve, 300));

    main.innerHTML = await routes[path]?.() || '<h2>404 - Página no encontrada</h2>';
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
    main.innerHTML = await routes[getCurrentPath()]?.() || '<h2>404</h2>';
    document.body.appendChild(main);

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
