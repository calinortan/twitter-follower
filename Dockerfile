FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./src ./src
COPY ./index.js ./

EXPOSE 5000

CMD ["node", "index.js"]