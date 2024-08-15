FROM node:20.12.0-alpine

WORKDIR /app

COPY ./package.json ./

ENV NODE_ENV=production
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]