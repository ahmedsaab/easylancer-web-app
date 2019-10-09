FROM node:10-alpine

WORKDIR /usr/src/app/temp

COPY . .

RUN apk add autoconf automake alpine-sdk libtool zlib-dev zlib nasm

RUN npm install

RUN npm run build

RUN mv server ..

RUN mv build ..

RUN mv package.json ..

WORKDIR /usr/src/app

RUN npm install --production

RUN rm -rf temp

RUN apk del autoconf automake alpine-sdk libtool zlib-dev zlib nasm

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
