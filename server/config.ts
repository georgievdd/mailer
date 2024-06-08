require('dotenv').config()
export const SERVER_PORT = process.env.SERVER_PORT
export const SERVER_HOST = process.env.SERVER_HOST
export const SECRET = process.env.SECRET

export const DEFAULT_SENDER = 'georgiewden@yandex.ru'
export const USE_SECRET = process.env.USE_SECRET === 'true'