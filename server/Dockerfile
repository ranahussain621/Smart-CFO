# Use a smaller node image as the base
FROM node:16.20.2

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .


# Expose the port your Node.js application is listening on (change as needed)
EXPOSE 4000

# Command to start your Node.js application
CMD ["node", "index.js"]
