# Используем официальный образ Node.js в качестве базового
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Сборка проекта
RUN npm run build

# Используем Nginx для сервировки файлов
FROM nginx:alpine

# Копируем сгенерированные файлы в Nginx директорию
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг для Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Указываем порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
