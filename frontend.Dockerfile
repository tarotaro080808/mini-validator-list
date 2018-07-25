FROM nginx:1.15.1-alpine

WORKDIR /usr/share/nginx/frontend

EXPOSE 80 443

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./frontend/dist /usr/share/nginx/dist