# Etapa de construcción
FROM node:14 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Etapa de producción
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
# COPY --from=builder /app/server.js ./
# Selecciona el archivo JSON según el entorno
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=prod

EXPOSE 9995

CMD ["node", "src/index.js"]
