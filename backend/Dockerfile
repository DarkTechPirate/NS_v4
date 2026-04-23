FROM node:20-alpine

WORKDIR /app

# Install sharp dependencies
RUN apk add --no-cache vips-dev build-base python3

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

# Command to run both the server and the worker
CMD ["npm", "run", "dev"]
