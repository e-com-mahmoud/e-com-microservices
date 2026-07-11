FROM node:22

WORKDIR /cart-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9003

ENTRYPOINT []

CMD ["node", "src/index.js"]
