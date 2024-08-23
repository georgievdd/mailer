FROM node:14
WORKDIR /usr/src/app
COPY ../package*.json ./
RUN npm install --production
COPY .. .
RUN npx tsc
CMD ["node", "dist/index"]