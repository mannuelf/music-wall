FROM node:18 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18
WORKDIR /app
COPY --from=base /app/build build/
COPY --from=base /app/node_modules node_modules/
COPY package.json ./
COPY --from=base /app/.env ./

ENV NODE_ENV=production
EXPOSE 3000

CMD [ "npm", "start" ]