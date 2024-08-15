FROM node:14
WORKDIR /usr/src/app
COPY ../package*.json ./
RUN npm install --production
COPY .. .
CMD ["npx", "ts-node", "index.ts"]