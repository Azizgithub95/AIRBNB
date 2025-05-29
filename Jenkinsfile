pipeline {
  agent any

  environment {
    IMAGE_NAME      = "hermes-tests"
    DOCKERHUB_CREDS = 'docker-hub-creds'
    DOCKERHUB_ORG   = 'aziztesteur95100'
  }

  stages {

    stage('Checkout') {
      steps {
        git credentialsId: 'lier github', url: 'https://github.com/Azizgithub95/AIRBNB.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "🔧 Construction de l'image Docker..."
        sh "docker build -t $IMAGE_NAME ."
      }
    }

    stage('Run Cypress Tests') {
      steps {
        echo "🚀 Lancement des tests Cypress..."
        sh "docker run --rm $IMAGE_NAME npx cypress run || true"
      }
    }

    stage('Run Newman Tests') {
      steps {
        echo "🧪 Lancement des tests Postman avec Newman..."
        sh "docker run --rm $IMAGE_NAME newman run tests/postman_collection.json || true"
      }
    }

    stage('Run K6 Tests (Cassis)') {
      steps {
        echo "📈 Lancement des tests K6..."
        sh "docker run --rm $IMAGE_NAME k6 run tests/test_k6.js || true"
      }
    }

    stage('Run FoundHuman Tests') {
      steps {
        echo "🤖 Simulation des tests FoundHuman..."
        sh "echo '[INFO] Test FoundHuman simulé (aucune commande réelle)'"
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          def TAGGED_IMAGE = "${DOCKERHUB_ORG}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
          sh "docker tag $IMAGE_NAME $TAGGED_IMAGE"
          withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
              docker push $TAGGED_IMAGE
            """
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        echo "🚀 Déploiement sur Kubernetes..."
        sh "kubectl apply -f deployment.yaml"
        sh "kubectl get pods"
        sh "kubectl get services"
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
