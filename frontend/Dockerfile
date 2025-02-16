FROM node:20.18.0-slim AS builder

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run build

FROM nginx:1.26.2-bookworm
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80