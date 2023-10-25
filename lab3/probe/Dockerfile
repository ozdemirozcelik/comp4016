FROM node:14-slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8080
CMD ["node", "probe.js"]
