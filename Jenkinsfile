pipeline {
    agent any  // Usa cualquier agente disponible (por ahora Jenkins mismo)

    environment {
        IMAGE_NAME = "leonel-portafolio"
        CONTAINER_NAME = "portafolio-temp"
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                echo 'Código ya está disponible porque usamos un volumen compartido.'
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo 'Construyendo imagen Docker del portafolio...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Desplegar Contenedor') {
            steps {
                script {
                    // Si ya está corriendo, lo detenemos y eliminamos
                    sh '''
                        docker ps -q --filter "name=$CONTAINER_NAME" | grep -q . && docker rm -f $CONTAINER_NAME || true
                        docker run -d --name $CONTAINER_NAME -p 4000:80 $IMAGE_NAME
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '🚀 ¡Portafolio desplegado en http://localhost:4000!'
        }
        failure {
            echo '❌ Algo falló durante el proceso.'
        }
    }
}
