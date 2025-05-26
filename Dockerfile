FROM jenkins/jenkins:lts-jdk17

USER root

# (facultatif : installer autre chose comme des libs utiles pour les tests)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

USER jenkins
