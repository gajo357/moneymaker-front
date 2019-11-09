FROM node:10 as builder

# Work directory where we copy the code
WORKDIR /app

# Install dependencies
COPY package.json ./package.json
RUN yarn install

COPY . .
# Build the app
RUN yarn build

# start from a light base
FROM nginx:alpine
# copy only the content of the build folder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]