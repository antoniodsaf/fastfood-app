FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV SWAGGER_URL="api/swagger"

CMD [ "npm", "run", "start:prod" ]