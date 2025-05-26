pipeline {
  agent any

  environment {
    IMAGE_NAME = "hermes-tests"
  }

  stages {
    stage('Checkout code') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/Azizgithub95/AIRBNB.git',
            credentialsId: '680a2740-a844-41cc-92fb-b7a06309f822'
          ]]
        ])
      }
    }

    stage('Build Docker image') {
      steps {
        echo "🔧 Construction de l'image Docker..."
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Run all tests found in Docker') {
      steps {
        echo "🚀 Lancement des tests Cypress, Newman et K6 dans le conteneur..."
        sh 'docker run --rm $IMAGE_NAME'
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline est enfin encireee terminé.'
    }
    failure {
      echo '❌ Échec du pipeline.'
    }
  }
}
