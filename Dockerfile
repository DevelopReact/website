# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем только манифесты для кеша зависимостей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем код и билдим
COPY . .
RUN yarn build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Устанавливаем curl для healthcheck'ов и отладки
RUN apk add --no-cache curl

# Копируем только необходимые артефакты
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Устанавливаем только прод-зависимости
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start"]
