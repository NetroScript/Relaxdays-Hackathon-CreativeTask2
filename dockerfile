FROM node:15

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn generate

EXPOSE 3000

CMD [ "yarn", "start" ]
