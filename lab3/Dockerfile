FROM node:14-slim
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y curl
RUN npm install
EXPOSE 8080
CMD ["node", "app.js"]
