FROM jenkins/jenkins:lts-jdk17

USER root

# Installer Docker CLI
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

# Ajouter l'utilisateur jenkins au groupe docker
RUN groupadd docker || true && usermod -aG docker jenkins

USER jenkins
