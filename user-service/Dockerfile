FROM node:22

WORKDIR /user-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

ENTRYPOINT []

CMD ["node", "src/index.js"]
