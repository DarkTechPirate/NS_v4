FROM node:20-alpine

WORKDIR /app

# Install sharp dependencies and build tools
RUN apk add --no-cache \
    vips-dev \
    build-base \
    python3 \
    libc6-compat

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

# Command to run both the server and the worker
CMD ["npm", "run", "dev"]
