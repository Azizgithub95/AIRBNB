FROM node:18

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
    gnupg \
    ca-certificates \
    curl \
    xvfb \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    libappindicator3-1 \
    x11-utils && \
    curl -s https://dl.k6.io/key.gpg | apt-key add - && \
    echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && \
    apt-get install -y k6 && \
    npm install && \
    npm install -g newman && \
    npx cypress install

EXPOSE 3000

CMD ["npm", "run", "start"]
