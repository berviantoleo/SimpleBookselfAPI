FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN adduser -D bookself && chown -R bookself /app
USER bookself
CMD ["npm","start"]