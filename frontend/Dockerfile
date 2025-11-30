FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --no-audit --no-fundCOPY . .

EXPOSE 3001

CMD ["npm", "start"]
