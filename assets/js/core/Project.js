export class Project {
    constructor({ id,titulo, descripcion, url, imagenes, tecnologias, rol, retos }) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
        this.imagenes = imagenes || [];
        this.tecnologias = tecnologias || [];
        this.rol = rol || {};
        this.retos = retos || {};
    }
    getId() {
        return this.id;
    }
    getTitulo(lang) {
        return this.titulo?.[lang] || this.titulo?.['es'] || '';
    }

    getDescripcion(lang) {
        return this.descripcion?.[lang] || this.descripcion?.['es'] || '';
    }

    getRol(lang) {
        return this.rol?.[lang] || this.rol?.['es'] || '';
    }

    getRetos(lang) {
        return this.retos?.[lang] || this.retos?.['es'] || '';
    }

    getImagenes() {
        return this.imagenes.length > 0 ? this.imagenes : ['assets/images/proyectos/default-project.png'];
    }
}

