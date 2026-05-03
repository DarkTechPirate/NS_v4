#!/bin/sh

# Ensure the nginx run directory exists
mkdir -p /run/nginx

# Start Nginx in the background
nginx

# Start PM2 in the foreground (it will manage backend and worker)
pm2-runtime start backend/ecosystem.config.js
