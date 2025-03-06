FROM node:latest as build
WORKDIR /usr/local/interface
COPY package*.json ./
COPY . .
RUN npm install
RUN npm ci
RUN npm run build

FROM nginx:latest as prod
COPY --from=build /usr/local/interface/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]