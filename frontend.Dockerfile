FROM nginx:1.15.1-alpine

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

EXPOSE 80 443

COPY ./frontend/dist /usr/share/nginx/html