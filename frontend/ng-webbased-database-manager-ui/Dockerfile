FROM node:latest

RUN mkdir /usr/src/cahce
WORKDIR /usr/src/cache

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
EXPOSE 4200

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

