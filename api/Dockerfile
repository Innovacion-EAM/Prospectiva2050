FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm install prisma ts-node @types/node @prisma/client bcryptjs @types/bcryptjs
RUN apk add --no-cache openssl
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["sh", "-c", "npx prisma db push --schema prisma/schema.prisma --accept-data-loss && npx prisma db seed --schema prisma/schema.prisma && node dist/main.js"]
