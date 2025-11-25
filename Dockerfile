# ---------------------------------------------------
# 1. Base Image
# ---------------------------------------------------
FROM node:20-alpine AS base

# Install libc6-compat (needed for some Next.js deps on Alpine)
RUN apk add --no-cache libc6-compat

# ---------------------------------------------------
# 2. Dependencies Stage
# ---------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
# (We use 'npm install' instead of 'ci' just in case you don't have a lockfile committed yet)
RUN npm install

# ---------------------------------------------------
# 3. Builder Stage
# ---------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# Build the app
# This runs "next build --turbopack" as defined in your package.json
RUN npm run build

# ---------------------------------------------------
# 4. Runner Stage (Production)
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the necessary files from the builder
COPY --from=builder /app/public ./public

# Set permissions for the .next folder
RUN mkdir .next
RUN chown nextjs:nodejs .next

# COPY STANDALONE BUILD
# This relies on output: 'standalone' in your next config (see below)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the app using the standalone server
CMD ["node", "server.js"]