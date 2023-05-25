# Base image
FROM node:20-alpine3.16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
