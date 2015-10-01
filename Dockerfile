FROM nginx
MAINTAINER Renat Nasyrov

ADD dist /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]