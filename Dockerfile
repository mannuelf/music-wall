FROM node:18 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json ./
COPY .env ./
ENV NODE_ENV=production
EXPOSE 3000

CMD [ "node", "-r", "dotenv/config", "build" ]