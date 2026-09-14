FROM node:22

WORKDIR /address-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9001

ENTRYPOINT []

CMD ["node", "src/index.js"]
