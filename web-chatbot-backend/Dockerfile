# Definindo a imagem base
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

RUN npm run build

CMD ["npm", "run", "start:prod"]