// 📁 main.js
import { routes } from './router.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { loadTranslations, changeLang } from './data/translationsRepository.js';

async function navigate(path) {
    const main = document.querySelector('main');
    if (!routes[path]) {
        main.innerHTML = '<h2>404 - Página no encontrada</h2>';
        return;
    }
    main.innerHTML = await routes[path]();
}

function setupNavLinks() {
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const path = link.getAttribute('href');
            history.pushState({}, '', path);
            navigate(path);
        });
    });
}

async function renderApp() {
    document.body.innerHTML = '';
    document.body.insertAdjacentHTML('afterbegin', renderHeader());

    const main = document.createElement('main');
    main.innerHTML = await routes[location.pathname]?.() || '<h2>404</h2>';
    document.body.appendChild(main);

    document.body.insertAdjacentHTML('beforeend', renderFooter());

    setupNavLinks();

    document.getElementById('lang-switcher').addEventListener('change', async (e) => {
        changeLang(e.target.value);
        renderApp();
    });
}


window.addEventListener('popstate', () => {
    navigate(location.pathname);
});

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    renderApp();
});
