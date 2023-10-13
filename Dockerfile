FROM node:18-alpine AS musicwall

LABEL Developers="Mannuel Ferreira"

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN rm -rf src/ static/

CMD ["node","build"]