import { t } from '../data/translationsRepository.js';

export function renderContactSection() {
    return `
    <section id="contacto">
      <h2>${t('contactTitle')}</h2>
      <p>${t('contactEmail')}: hugoleovazquez@gmail.com</p>
      <p><a href="https://github.com/LeonelChagoya" target="_blank">${t('github')}</a></p>
    </section>
  `;
}
