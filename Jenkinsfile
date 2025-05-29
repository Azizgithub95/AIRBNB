pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'aziztesteur95100/hermes-tests'
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Azizgithub95/AIRBNB.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'docker run --rm ${DOCKER_IMAGE} npx cypress run'
            }
        }

        stage('Run Newman Tests') {
            steps {
                sh 'docker run --rm ${DOCKER_IMAGE} newman run tests/postman_collection.json'
            }
        }

        stage('Run K6 Tests (Cassis)') {
            steps {
                sh 'docker run --rm -v $PWD:/app -w /app loadimpact/k6 run tests/k6_test.js'
            }
        }

        stage('Run FoundHuman Tests') {
            steps {
                sh 'docker run --rm ${DOCKER_IMAGE} node tests/foundhuman.js'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}
