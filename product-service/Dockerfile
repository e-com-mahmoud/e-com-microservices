FROM node:22

WORKDIR /product-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9002

ENTRYPOINT []

CMD ["node", "src/index.js"]
