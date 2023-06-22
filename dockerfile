# Create a new Docker image based on Node.js image
FROM node:18-alpine3.15

ENV NODE_ENV=production

# Create an application directory
RUN mkdir -p /app

# Create a directory for the app and set it as the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# or COPY ["package.json", "package-lock.json*", "./"]

# Install the dependencies
RUN npm install --omit=dev

# To fix vulnerabilities
# RUN npm audit fix

# Copy all the source code to the container
COPY . .

# Expose the port that the app will be running on
EXPOSE 8000

# Start the app
CMD [ "node", "index.js" ]

