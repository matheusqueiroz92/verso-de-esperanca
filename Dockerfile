# Etapa 1: Construir a aplicação
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Executa o build para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM apache:alpine

# Copia os arquivos gerados (build) para o Apache
COPY --from=build /app/dist /var/www/versodeesperanca.matheusqueiroz.tech/verso-de-esperanca

# Expõe a porta 80 para o NGINX servir o site
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]