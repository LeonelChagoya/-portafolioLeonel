# Usa una imagen liviana de servidor web
FROM nginx:alpine

# Copia el contenido del portafolio a la carpeta pública del servidor
COPY .. /usr/share/nginx/html

# (Nginx ya sirve desde el puerto 80)

