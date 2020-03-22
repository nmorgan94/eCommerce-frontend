# FROM node:10-alpine as Build

# RUN mkdir -p /build/client

# COPY client/package.json /build/client
# COPY client/yarn.lock /build/client

# WORKDIR /build/client

# RUN yarn install --production=true

# COPY client /build/client

# RUN yarn build

# RUN mkdir -p /build/server

# COPY server/package.json /build/server
# COPY server/yarn.lock /build/server

# WORKDIR /build/server

# RUN yarn install 

# COPY server /build/server

# RUN yarn build

# WORKDIR /build/server/build

# EXPOSE 5000

# CMD ["node", "server.js"]

FROM node:alpine 
COPY . /app

WORKDIR /app/client

RUN yarn install --no-cache && yarn run build && yarn global add serve

WORKDIR /app/server
RUN yarn install
EXPOSE 5000
CMD ["yarn", "start", "server.js"]



