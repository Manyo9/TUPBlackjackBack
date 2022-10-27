# TUP Blackjack - Back-End

## Librerías usadas:
En desarrollo: typescript @types/express ts-node-dev @types/jsonwebtoken @types/cors @types/mysql

express jsonwebtoken cors mysql dotenv

## Para correr en modo desarrollo
`npm install`  
`npm run dev`

## Los archivos para crear la DB están en:
https://github.com/Manyo9/TUPBlackjackBack/tree/main/db

## Si hay problemas con la conexion a la DB
`ALTER USER 'tu_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_pass';`

## Si vscode toma .env para hacer un commit
`git update-index --assume-unchanged .env`

