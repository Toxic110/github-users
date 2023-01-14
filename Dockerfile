FROM node:16 as simple-build

WORKDIR /app

COPY . ./
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY --from=simple-build /app/build /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]