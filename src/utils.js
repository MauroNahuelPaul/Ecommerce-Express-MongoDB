import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import winston from 'winston'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)


export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createLogger = env => {
    if (env == 'PROD') {
        return winston.createLogger({
            levels: {
                debug: 0,
                http: 1,
                info: 2,
                warning: 3,
                error: 4,
                fatal: 5,
            },
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.simple(),
                    )
                }),
                new winston.transports.File({
                    level: 'error',
                    filename: './logs/errors.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.simple(),
                    )
                })
            ]
        })
    } else {
        return winston.createLogger({
            levels: {
                debug: 0,
                http: 1,
                info: 2,
                warning: 3,
                error: 4,
                fatal: 5,
            },
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple(),
                    )
                })
            ]
        })
    }
}

export const logger = createLogger(process.env.ENVIRONMENT)
