FROM nginx
MAINTAINER Renat Nasyrov

ADD nginx.conf /etc/nginx/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]