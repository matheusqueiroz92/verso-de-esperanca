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
FROM nginx:alpine

# Copia os arquivos gerados (build) para o NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 para o NGINX servir o site
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]