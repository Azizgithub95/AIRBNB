pipeline {
  agent any

  environment {
    IMAGE_NAME      = "hermes-tests"
    DOCKERHUB_CREDS = 'docker-hub-creds'
    DOCKERHUB_ORG   = 'aziztesteur95100'
  }

  stages {

    stage('Clean Workspace') {
      steps {
        echo "🧹 Nettoyage du workspace..."
        deleteDir()
      }
    }

    stage('Checkout') {
      steps {
        echo "🔄 Récupération du code source depuis GitHub..."
        checkout scm
      }
    }

    stage('Build Docker image') {
      steps {
        echo "🔧 Construction de l'image Docker..."
        sh "docker build -t $IMAGE_NAME ."
      }
    }

    stage('Run all tests found in Docker') {
      steps {
        echo "🚀 Lancement des tests Cypress, Newman et K6 dans le conteneur..."
        sh "docker run --rm $IMAGE_NAME"
      }
    }

    stage('Docker Build & Push') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDS}") {
            def image = docker.build("${DOCKERHUB_ORG}/hermes-test:${BUILD_NUMBER}")
            image.push()
          }
        }
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline terminé.'
    }
    failure {
      echo '❌ Échec du pipeline.'
    }
  }
}
