FROM node:lts-alpine
WORKDIR /usr/src/fosscord-cdn
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "dist/"]