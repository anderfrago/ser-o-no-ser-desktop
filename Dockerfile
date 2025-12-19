# Stage 1: Build the Angular application
FROM node AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# ng build --configuration production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/dist/ser-o-no-ser-ng/browser /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
