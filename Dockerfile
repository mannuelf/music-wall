FROM node:18-alpine AS base

LABEL Developers="Mannuel Ferreira"

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node","build"]