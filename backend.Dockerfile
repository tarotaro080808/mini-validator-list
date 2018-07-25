FROM node:10.6.0-alpine

WORKDIR /usr/src

COPY ./backend/.env ./backend/package.json /usr/src/

RUN yarn install --production

COPY ./backend/build/src /usr/src/api/

RUN ls -la /usr/src/api

CMD ["yarn", "run", "start"]
