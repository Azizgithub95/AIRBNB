pipeline {
  agent any

  environment {
    IMAGE_NAME = "hermes-tests"
  }

  stages {
    stage('Checkout code') {
      steps {
        git 'https://github.com/Azizgithub95/AIRBNB.git'
      }
    }

    stage('Build Docker image') {
      steps {
        echo "🔧 Construction de l'image Docker..."
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Run all tests fond in Docker') {
      steps {
        echo "🚀 Lancement des tests Cypress, Newman et K6 dans le conteneur..."
        sh 'docker run --rm ${IMAGE_NAME}'
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline est enfin terminé.'
    }
    failure {
      echo '❌ Échec du pipeline.'
    }
  }
}