FROM node:18.18.0-alpine3.18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 1000
CMD npm start