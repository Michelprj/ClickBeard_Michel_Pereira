FROM node:16.14-alpine

WORKDIR /backend

COPY package*.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start:dev"]
