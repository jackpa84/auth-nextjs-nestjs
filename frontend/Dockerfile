FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

RUN npm install --no-package-lock

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]