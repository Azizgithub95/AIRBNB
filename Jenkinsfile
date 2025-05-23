pipeline {
  agent any

  environment {
    IMAGE_NAME = "hermes-tests"
  }

  stages {
    stage('Checkout code') {
      steps {
        git 'https://github.com/Azizgithub95/HERMES.git'
      }
    }

    stage('Build Docker image') {
      steps {
        echo "🔧 Construction de l'image Docker..."
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Run all tests in Docker') {
      steps {
        echo "🚀 Lancement des tests Cypress, Newman et K6 dans le conteneur..."
        sh 'docker run --rm ${IMAGE_NAME}'
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