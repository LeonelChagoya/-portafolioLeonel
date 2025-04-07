// Importación de rutas estáticas y dinámicas
import { dynamicRoutes, routes } from './router.js';
// Renderizado del encabezado y pie de página
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
// Funciones de traducción: carga de textos y cambio de idioma
import { loadTranslations, changeLang } from './data/translationsRepository.js';

// Funcionalidades específicas para vista de proyectos
import { setupLightbox } from './interactions/lightboxHandler.js';
import { setupProjectDetailInteractions } from './interactions/setupProjectDetailInteractions.js';

// Obtiene la ruta actual desde el hash (URL fragment) o devuelve '/' si no hay hash.
// Ejemplo: #/about -> '/about'
function getCurrentPath() {
    return window.location.hash.replace(/^#/, '') || '/';
}
// Esta función maneja la navegación (renderizado de la vista correspondiente a la ruta actual)
async function navigate(path) {
    // Selecciona el contenedor principal
    const main = document.querySelector('main');
    // Aplica animación de salida para transición visual
    main.classList.add('fade-out');
   // Espera 300ms para que la animación se vea antes de cambiar contenido
    await new Promise(resolve => setTimeout(resolve, 300));

    let matched = false;
    // Si la ruta es una ruta estática (como '/about'), se renderiza directamente
    if (routes[path]) {
        main.innerHTML = await routes[path]();
        matched = true;
    } else {
        // Si no es una ruta estática, se buscan coincidencias con rutas dinámicas (ej. '/project/:id')
        for (const route of dynamicRoutes) {
            const match = path.match(route.pattern);
            if (match) {
                // extrae el parámetro de la ruta (por ejemplo, el ID del proyecto)
                const param = match[1];
                main.innerHTML = await route.render(param);
                matched = true;
                // Si la ruta es de tipo /project/, inicializa interacciones específicas para esa vista

                if (path.startsWith('/project/')) {
                    setupProjectDetailInteractions();
                    setupLightbox();
                }

                break;
            }
        }
    }

    // Si no hubo coincidencia en ninguna ruta, muestra un mensaje de 404
    if (!matched) {
        main.innerHTML = '<h2 data-i18n="notFound">404 - Página no encontrada</h2>';
    }
   // Elimina clase de animación al terminar
    main.classList.remove('fade-out');

}
// Asigna manejadores de eventos a todos los enlaces con data-link para navegación SPA
function setupNavLinks() {
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            // obtiene la ruta destino
            const path = link.getAttribute('href').replace(/^#/, '');
            // cambia el hash, lo que dispara el evento 'hashchange'
            window.location.hash = path;
        });
    });
}
// Manejador del cambio de idioma desde el <select>
async function onLangChange(e) {
    changeLang(e.target.value); // actualiza el idioma en memoria y en localStorage
    //vuelve a cargar el archivo de traducción correspondiente
    await loadTranslations();
    // re-renderiza dinámicamente el header y la vista actual
    await rerenderContent();

}

// Re-renderiza partes dinámicas sin recargar la página entera
async function rerenderContent() {
    // Reemplaza el header actual por uno nuevo (en el idioma actualizado)
    const oldHeader = document.querySelector('header');
    if (oldHeader) oldHeader.replaceWith(document.createRange().createContextualFragment(renderHeader()));

    const path = getCurrentPath();
    const main = document.querySelector('main');
    // Renderiza la vista correspondiente a la ruta
    if (routes[path]) {
        main.innerHTML = await routes[path]();
    } else {
        for (const route of dynamicRoutes) {
            const match = path.match(route.pattern);
            if (match) {
                const param = match[1];
                main.innerHTML = await route.render(param);
                break;
            }
        }
    }
    // Vuelve a asignar eventos de navegación y cambio de idioma
    setupNavLinks();
    document.getElementById('lang-switcher')?.addEventListener('change', onLangChange);

}
// Renderiza toda la aplicación por primera vez (cuando carga la página)
async function renderApp() {
    // Limpia el body completo (reset visual)
    document.body.innerHTML = '';
    // Inserta el header (navegación + idioma)
    document.body.insertAdjacentHTML('afterbegin', renderHeader());
    // Crea y muestra un spinner  mientras se carga la vista principal
    const main = document.createElement('main');
    main.innerHTML = `
      <div class="loader-container">
        <div class="spinner"></div>
      </div>
    `;
    document.body.appendChild(main);
    // Renderiza la vista correspondiente a la ruta actual
    await navigate(getCurrentPath());
    // Agrega el footer
    document.body.insertAdjacentHTML('beforeend', renderFooter());
    // Asigna eventos de navegación y cambio de idioma
    setupNavLinks();

    document.getElementById('lang-switcher')?.addEventListener('change', onLangChange);
}

// Escucha cambios en la URL (hashchange) para manejar navegación SPA
window.addEventListener('hashchange', () => {
    navigate(getCurrentPath());
});
// Código que se ejecuta al cargar completamente el DOM (inicio de la app)
document.addEventListener('DOMContentLoaded', async () => {
    // Carga los textos en el idioma actual (desde localStorage o por defecto)
    await loadTranslations();
    // Inicializa la interfaz completa de la aplicación
    renderApp();
});
