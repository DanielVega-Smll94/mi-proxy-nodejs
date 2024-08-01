# Etapa de construcción
FROM node:14 as builder

WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./
RUN npm install

COPY . .

# Etapa de producción
FROM node:14-alpine

WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

# Copia los archivos de certificados SSL
COPY src/certificate.pem /app/certificate.pem
COPY src/certificate.key /app/certificate.key
COPY src/ssl_passwords.txt /app/ssl_passwords.txt

# Selecciona el archivo JSON según el entorno
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

# Instala las dependencias de producción
RUN npm install --only=prod

# Instala nginx
RUN apk update && apk add nginx

# Configura Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Configura el entorno
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

# Configura la exposición del puerto
EXPOSE 9995

# Comando de inicio
CMD ["node", "src/index.js"]
