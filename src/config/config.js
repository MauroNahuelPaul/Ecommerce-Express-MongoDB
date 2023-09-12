import dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = process.env.MONGO_URI 
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME

export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET

export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY

export const PORT = process.env.PORT

export const PERSISTENCE = process.env.PERSISTENCE
