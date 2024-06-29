# Use Ubuntu image as the base image
FROM ubuntu:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json index.js public views ./

# Install the dependencies
RUN npm install

# Expose the port that the app runs on
EXPOSE 9000

USER root

# Start the application
CMD ["node", "index.js"]
