# Basis-Image mit Node.js
FROM node:18-alpine

WORKDIR /frontend

EXPOSE 3000

# Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# Quellcode kopieren und App bauen
COPY . .
RUN npm run build

# Serve installieren und starten
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
