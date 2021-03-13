FROM node:15-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/app
RUN yarn install

RUN yarn build

EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]
