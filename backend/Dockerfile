FROM node:20-slim

WORKDIR /app

# Install native dependencies for sharp and other tools
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

# Command to run both the server and the worker
CMD ["npm", "run", "dev"]
