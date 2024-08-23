require('dotenv').config()
export const SERVER_PORT = process.env.SERVER_PORT
export const SECRET = process.env.SECRET
export const USE_SECRET = process.env.USE_SECRET === 'true'