FROM node:12-alpine AS BUILD_IMAGE
COPY . /app

WORKDIR /app/client

RUN yarn install --no-cache --production=true && yarn run build 

WORKDIR /app/server
RUN yarn install



FROM node:12-alpine

WORKDIR /app/client

COPY --from=BUILD_IMAGE /app/client/build ./build
COPY --from=BUILD_IMAGE /app/client/node_modules ./node_modules

WORKDIR /app/server

COPY --from=BUILD_IMAGE /app/server .


EXPOSE 5000
CMD ["npm", "start"]




