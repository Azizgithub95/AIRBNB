pipeline {
  agent any

  environment {
    IMAGE_NAME      = "hermes-tests"
    DOCKERHUB_CREDS = 'docker-hub-creds'
    DOCKERHUB_ORG   = 'aziztesteur95100'
    GIT_REPO_URL    = 'https://github.com/Azizgithub95/mon-deuxieme-projet-docker.git' // Remplace si besoin
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
    sh "git clone https://github.com/Azizgithub95/AIRBNB.git ."
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
stage('Deploy to Kubernetes') {
  steps {
    sh 'kubectl apply -f deployment.yaml'
    sh 'kubectl get pods'
    sh 'kubectl get services'
  }
}



   stage('Docker Build enfinnnnn ca marche jespere c 'est sur & Push') {
      steps {
        script {
          // Remplacer "docker" par l'appel système
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
