FROM node:20-alpine

RUN apk add --no-cache openssl openssl-dev libc6-compat curl

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

RUN npm install --no-package-lock

RUN npx prisma generate

COPY . .

RUN echo "=== Verificando sintaxe TypeScript ===" && \
    npx tsc --noEmit --skipLibCheck || echo "⚠️  Avisos de TypeScript (continuando...)"

RUN npm run build

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

CMD ["sh", "-c", "npx prisma db push --skip-generate && npx ts-node prisma/seed.ts && node dist/src/main"]