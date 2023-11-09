import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

export const MONGO_URI = process.env.MONGO_URI 
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME

export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET

export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY

export const PORT = process.env.PORT

export const ENVIRONMENT = process.env.ENVIRONMENT
export const PERSISTENCE = process.env.PERSISTENCE

let config = {
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
}
export const transporter = nodemailer.createTransport(config)