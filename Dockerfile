FROM node:alpine

WORKDIR /src/app

COPY . /src/app

RUN npm install -g @angular/cli

RUN npm install --force

CMD ["ng", "serve", "--host", "0.0.0.0"]