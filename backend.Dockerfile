FROM node:10.6.0-alpine

WORKDIR /usr/app

COPY ./backend/package.json /usr/app/

RUN yarn install --production

COPY ./backend/run.sh /usr/app/

COPY ./backend/build/src /usr/app/api/

CMD ["sh", "./run.sh"]
