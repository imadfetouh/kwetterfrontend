# Build
FROM node as build
WORKDIR /app
COPY /kwetterfrontend/package.json ./
RUN npm install
COPY /kwetterfrontend/. ./
RUN npm run-script build

# Serve
FROM httpd:latest
COPY --from=build /app/build /usr/local/apache2/htdocs/