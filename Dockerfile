# Etapa 1: Build
FROM node:20-alpine AS builder

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./
# Si usas bun.lockb o pnpm, copia también el lock correspondiente
RUN npm install

# Copiar todo el proyecto
COPY . .



# Build de producción
RUN npm run build

# Etapa 2: Run
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY .env.local .env

# Puerto en el que Next.js escuchará
ENV PORT=4500
EXPOSE 4500

# Comando para iniciar la app
CMD ["npm", "run", "start", "--", "-p", "4500"]
