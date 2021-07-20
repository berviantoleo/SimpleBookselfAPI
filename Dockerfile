FROM node:lts-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

FROM node:lts-alpine as runtime
WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production
RUN adduser -D bookself && chown -R bookself /app
USER bookself
CMD ["yarn","start"]