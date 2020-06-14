FROM node:12-alpine AS BUILD_IMAGE
COPY . /app
WORKDIR /app
RUN yarn install --no-cache --production=true && yarn run build 

FROM httpd:2.4.43
WORKDIR /usr/local/apache2/htdocs
COPY --from=BUILD_IMAGE /app/build .
COPY ./apache/httpd.conf /usr/local/apache2/conf/httpd.conf
RUN chmod -R a+rw  /usr/local/apache2/logs
EXPOSE 5000
