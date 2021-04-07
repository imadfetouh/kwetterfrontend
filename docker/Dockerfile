# Build
FROM node as build
WORKDIR /app
COPY /kwetterfrontend/package.json ./
RUN npm install
COPY /kwetterfrontend/. ./

CMD ["npm", "start"]  