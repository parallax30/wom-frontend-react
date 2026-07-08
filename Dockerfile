# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

ENV NPM_CONFIG_FETCH_RETRIES=5 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000 \
    NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000 \
    NPM_CONFIG_FETCH_TIMEOUT=600000

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_TOKEN
ARG NEXT_PUBLIC_HELPER_API
ARG NEXT_PUBLIC_HELPER_API_TOKEN
ARG NEXT_PUBLIC_STRAPI_MEDIA
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_AUTH_SECRET

RUN export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://holy-rhythm-d59945257b.strapiapp.com}" \
    NEXT_PUBLIC_STRAPI_URL="${NEXT_PUBLIC_STRAPI_URL:-https://holy-rhythm-d59945257b.strapiapp.com}" \
    NEXT_PUBLIC_STRAPI_MEDIA="${NEXT_PUBLIC_STRAPI_MEDIA:-https://holy-rhythm-d59945257b.media.strapiapp.com}" \
    NEXT_PUBLIC_API_TOKEN="$NEXT_PUBLIC_API_TOKEN" \
    NEXT_PUBLIC_HELPER_API="$NEXT_PUBLIC_HELPER_API" \
    NEXT_PUBLIC_HELPER_API_TOKEN="$NEXT_PUBLIC_HELPER_API_TOKEN" \
    NEXT_PUBLIC_AUTH_SECRET="$NEXT_PUBLIC_AUTH_SECRET" \
  && test -n "$NEXT_PUBLIC_API_TOKEN" || (echo "Missing required build arg: NEXT_PUBLIC_API_TOKEN" && exit 1) \
  && npm run build

# ---------- Runtime ----------
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Cloud Run escucha en $PORT (normalmente 8080)
EXPOSE 8080

CMD ["npm", "run", "start"]

