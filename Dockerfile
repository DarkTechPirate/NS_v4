# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# Add build-time env vars if needed
ARG VITE_API_URL=/api
ARG VITE_SOCKET_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
RUN npm run build # Outputs to /app/frontend/dist (Vite default)

# Stage 2: Final Image
FROM node:20
WORKDIR /app

# Install Nginx & PM2
RUN apt-get update && apt-get install -y nginx && npm install -g pm2 && rm -rf /var/lib/apt/lists/*

# Setup Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./

# Copy Frontend Assets
WORKDIR /app/frontend
COPY --from=frontend-builder /app/frontend/dist ./dist

# Nginx Config
# In Debian, we place the server block in /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Remove the default nginx site to avoid conflicts
RUN rm -f /etc/nginx/sites-enabled/default

# Entrypoint script to start PM2
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000
CMD ["/app/entrypoint.sh"]
