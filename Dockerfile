# Dockerfile para portafolio estático con HTML/CSS/JS
# Usa una imagen ligera de NGINX como base
FROM nginx:alpine

# Crea una carpeta dentro del contenedor para los archivos
WORKDIR /usr/share/nginx/html

# Elimina archivos HTML por defecto de NGINX
RUN rm -rf ./*

# Copia los archivos de tu portafolio local al contenedor
COPY ./ ./

# Expone el puerto 80 (por defecto en NGINX)
EXPOSE 80

# Usa el comando por defecto de nginx
CMD ["nginx", "-g", "daemon off;"]
