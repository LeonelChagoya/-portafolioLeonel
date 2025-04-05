export class Project {
    constructor(titulo, descripcion, url) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
    }

    getTitulo(lang) {
        return this.titulo?.[lang] || this.titulo?.['es'] || '';
    }

    getDescripcion(lang) {
        return this.descripcion?.[lang] || this.descripcion?.['es'] || '';
    }
}
