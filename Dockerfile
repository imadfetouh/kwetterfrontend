# Build
FROM node:alpine
WORKDIR /app
COPY kwetterfrontend/package.json ./
RUN npm install
COPY . ./
RUN npm run-script build

# Serve
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]