FROM node:16 as build
WORKDIR /usr/local/interface
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:latest as prod
COPY --from=build /usr/local/interface/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
expose 3000
CMD ["nginx", "-g", "daemon off;"]