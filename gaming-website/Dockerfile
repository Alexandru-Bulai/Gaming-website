FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 3001
ENV HOST=0.0.0.0
ENV PORT=3000
ENV HMR_PORT=3001
CMD ["npm", "run", "dev"]