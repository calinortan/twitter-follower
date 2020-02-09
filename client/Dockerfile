FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY . .

RUN yarn

RUN yarn run prod:build-client
RUN yarn run prod:build-server

EXPOSE 3000

CMD ["node", "build/server.js"]