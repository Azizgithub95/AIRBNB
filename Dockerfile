FROM node:18
WORKDIR /app
COPY . .
RUN npm install && \
    npx cypress install
RUN npm install -g newman
RUN apt-get update && apt-get install -y \
    gnupg \
    ca-certificates \
    curl && \
    curl -s https://dl.k6.io/key.gpg | apt-key add - && \
    echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && apt-get install -y \
    k6 \
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
    x11-utils

CMD ["npm", "run", "test-all"]