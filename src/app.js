import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import mongoose from "mongoose";
import passport from "passport";
import { Server } from 'socket.io'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress   from "swagger-ui-express";

import initializePassport from "./config/passport.config.js";
import { MONGO_DB_NAME, MONGO_URI, PORT, SESSION_SECRET_KEY } from './config/config.js'
import { logger, __dirname } from "./utils.js";

import viewsProductsRouter from "./routers/views.router.js";
import productRouter from "./routers/product.router.js"
import sessionRouter from "./routers/session.router.js"
import cartRouter from "./routers/cart.router.js"
import chatRouter from "./routers/chat.router.js"
import MockRouter from "./routers/mock.router.js"
import loggerRouter from "./routers/logger.router.js"

const app = express()
app.use(express.json());

try {
    await mongoose.connect(MONGO_URI + MONGO_DB_NAME)
    app.use(session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            dbName: MONGO_DB_NAME,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        secret: SESSION_SECRET_KEY,
        resave: true,
        saveUninitialized: true
    }))

    const swaggerOptions ={
        definition:{
            openapi:'3.0.1',
            info:{
                title:'Documentación del Ecommerce',
                description:'Todas las funcionalidades'
            }
        },
        apis:['./docs/**/*.yaml']
    }
    const specs = swaggerJSDoc(swaggerOptions)
    app.use('/docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

    initializePassport()
    app.use(passport.initialize())
    app.use(passport.session())

    const serverHttp = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
    const io = new Server(serverHttp)
    app.set("socketio", io);

    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname + "/public"))

    app.engine('handlebars', handlebars.engine())
    app.set('views', __dirname + "/views")
    app.set('view engine', 'handlebars')


    app.use("/", viewsProductsRouter);
    app.use("/loggerTest", loggerRouter)
    app.use("/api/products", productRouter);
    app.use("/api/cart", cartRouter);
    app.use('/api/session', sessionRouter);
    app.use('/api/chat', chatRouter);
    app.use("/api/mockingproducts", MockRouter)

    io.on('connection', async socket => {
        //Chat
        const resultChat = await fetch("http://localhost:8080/api/chat")
        const dataChat = await resultChat.json()
        io.emit("updatedChat", dataChat.payload);
        socket.on("updatedChat", async () => {
            const resultChat = await fetch("http://localhost:8080/api/chat")
            const dataChat = await resultChat.json()
            io.emit("updatedChat", dataChat.payload);
        });
    })

} catch (err) {
    console.log(err)
}

