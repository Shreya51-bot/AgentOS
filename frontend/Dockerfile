FROM node:18-alpine

WORKDIR /workspace

# Install dependencies first for caching layers
COPY package.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose Next.js port
EXPOSE 3000

# Run in development mode by default (fits local docker-compose orchestration)
CMD ["npm", "run", "dev"]
