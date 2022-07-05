# Base image
FROM node:16.15.1-alpine as base

# Install all dependencies
FROM base as deps

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

# Build with dev dependencies
FROM base as build

ENV NODE_ENV=production

WORKDIR /app

ENV VITE_API_URL="https://the-wall-api.fly.dev"

COPY --from=deps /app/node_modules ./node_modules

ADD package.json package-lock.json ./
ADD ./vite.config.js ./vite.config.js
ADD ./src ./src

RUN npm run build

# Serve static site
FROM pierrezemb/gostatic

COPY --from=build /app/dist/ /srv/http/
