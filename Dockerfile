# Stage 1: Build the React app
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Serve the app using nginx
FROM nginx:alpine

# Copy the built React app from the previous stage to the nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
