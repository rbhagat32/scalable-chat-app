FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --loglevel=error
COPY prisma ./prisma/
RUN npx prisma generate
COPY . ./
RUN npm run build
RUN npm prune --omit=dev

FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000
CMD npm start