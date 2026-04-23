FROM node:20

WORKDIR /app

# We are using the full 'node:20' image which includes all necessary build tools.
# Sharp 0.33+ also bundles its own binaries, so no extra system libraries are needed.

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

# Command to run both the server and the worker
CMD ["npm", "run", "dev"]
