FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && && yarn cache clean

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.migrations ./.migrations

EXPOSE 3000

CMD ["sh", "-c", "node dist/db/migrate.js && node dist/http/server.js"]