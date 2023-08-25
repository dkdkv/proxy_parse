# Proxy Parse
Проект для извлечения данных с помощью вращения прокси-серверов.

## Начало работы
### Предварительные требования
- Node.js
- Prisma
- .env с необходимыми параметрами
## Установка
1. Клонируйте репозиторий:
```bash
git clone https://github.com/dkdkv/proxy_parse
```
2. Установите зависимости:
```bash
npm install
```
3. Создайте файл .env в корневой директории проекта со следующим содержимым:
```dotenv
DATABASE_URL="file:./dev.db"
URL_TEMPLATE=https://dummyjson.com/products/{ARTICLE_ID}
MAX_REQUESTS_PER_PROXY=30
PROXY_COOLDOWN=15000
TIMEOUT=7000
MAX_RETRIES=3
```
4. Запустите скрипт:
```bash
npm start
```