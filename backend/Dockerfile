FROM node:20.18.0-slim AS builder

WORKDIR /app
COPY . /app

RUN npm ci

EXPOSE 3000

CMD ["node", "app.js"]