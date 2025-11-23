#!/bin/bash

# Script para desenvolvimento rápido
echo "🚀 Iniciando ambiente de desenvolvimento..."

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker compose down

# Build e start dos serviços
echo "🔨 Construindo e iniciando containers..."
docker compose up -d --build postgres redis

# Aguardar o PostgreSQL ficar pronto
echo "⏳ Aguardando PostgreSQL ficar pronto..."
until docker exec modern_app_postgres pg_isready -U admin -d modernapp; do
  sleep 2
done

echo "✅ PostgreSQL está pronto!"

# Executar migrações e seed
echo "🗃️ Executando migrações do Prisma..."
cd backend
npx prisma migrate dev --name init

echo "🌱 Populando banco de dados com dados iniciais..."
npx prisma db seed

echo "🎉 Ambiente de desenvolvimento pronto!"
echo ""
echo "📊 Acesse:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo "   Prisma Studio: npx prisma studio (no diretório backend)"
echo ""
echo "👤 Credenciais de teste:"
echo "   Email: demo@example.com"
echo "   Senha: password123"