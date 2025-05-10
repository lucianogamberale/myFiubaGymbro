# Step 1: Build the Vite app
FROM node:20-alpine AS build

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .
RUN npm run build

# Step 2: Serve the built app with a full Node image (not Alpine)
FROM node:20

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the build output from the first stage
COPY --from=build /app/dist ./dist

# Expose the port used by serve
EXPOSE 8080

# Start the app
CMD ["serve", "-s", "dist", "-l", "8080"]
