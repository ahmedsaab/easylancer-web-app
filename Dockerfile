FROM node:10-alpine

WORKDIR /usr/src/app/temp

COPY . .

RUN npm install

RUN npm run build

RUN mv server ..

RUN mv build ..

RUN mv package.json ..

RUN npm install --production

WORKDIR /usr/src/app

RUN rm -rf temp

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
