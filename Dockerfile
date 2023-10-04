FROM node:18.18.0-alpine3.18

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 80

CMD serve -s build