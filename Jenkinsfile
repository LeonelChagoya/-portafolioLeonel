pipeline {
    agent any // Jenkins usará cualquier nodo disponible

    environment {
        IMAGE_NAME = "leonel-portafolio"            // Nombre de la imagen Docker a construir
        CONTAINER_NAME = "portafolio-temp"          // Nombre temporal del contenedor
        HOST_PORT = "4000"                          // Puerto en el host para exponer la app
        CONTAINER_PORT = "80"                       // Puerto dentro del contenedor
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                echo '✅ Repositorio clonado automáticamente por Jenkins.'
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo '🔨 Construyendo imagen Docker del portafolio...'
                sh """
                    docker build -t $IMAGE_NAME .
                """
            }
        }

        stage('Desplegar Contenedor') {
            steps {
                echo '🚀 Desplegando contenedor Docker...'
                sh """
                    # Detiene y elimina contenedor si ya existe
                    docker ps -q --filter "name=$CONTAINER_NAME" | grep -q . && docker rm -f $CONTAINER_NAME || true

                    # Ejecuta el nuevo contenedor
                    docker run -d \
                        --name $CONTAINER_NAME \
                        -p $HOST_PORT:$CONTAINER_PORT \
                        $IMAGE_NAME
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline ejecutado con éxito. El portafolio está disponible en http://localhost:$HOST_PORT"
        }
        failure {
            echo "❌ Falló el pipeline. Revisa los logs para más detalles."
        }
    }
}
