pipeline {
    agent any

    environment {
        IMAGE_NAME = "leonel-portafolio"
        CONTAINER_NAME = "portafolio-deploy"
        PORT = "4000"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                echo '🔨 Construyendo imagen Docker del portafolio...'
                sh 'docker build -t $IMAGE_NAME ./portafolioLeonelV'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Desplegando contenedor...'
                sh '''
                    docker ps -q --filter "name=$CONTAINER_NAME" | grep -q . && docker rm -f $CONTAINER_NAME || true
                    docker run -d --name $CONTAINER_NAME -p $PORT:80 $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Despliegue exitoso en http://localhost:$PORT"
        }
        failure {
            echo "❌ Falló el despliegue."
        }
    }
}
