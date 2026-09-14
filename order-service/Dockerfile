FROM node:22

WORKDIR /order-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9004

ENTRYPOINT []

CMD ["node", "src/index.js"]
