import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import viewsProductsRouter from "./routers/views.router.js";
import productRouter from "./routers/product.router.js"
import sessionRouter from "./routers/session.router.js"
import cartRouter from "./routers/cart.router.js"
import chatRouter from "./routers/chat.router.js"
import mongoose from "mongoose";
import passport from "passport";
import { Server } from 'socket.io'
import initializePassport from "./config/passport.config.js";
import { MONGO_DB_NAME, MONGO_URI, PORT, SESSION_SECRET_KEY } from './config/config.js'

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

    initializePassport()
    app.use(passport.initialize())
    app.use(passport.session())

    const serverHttp = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    const io = new Server(serverHttp)
    app.set("socketio", io);

    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname + "/public"))

    app.engine('handlebars', handlebars.engine())
    app.set('views', __dirname + "/views")
    app.set('view engine', 'handlebars')



    app.use("/", viewsProductsRouter);
    app.use('/api/session', sessionRouter);
    app.use('/api/chat', chatRouter);
    app.use("/api/products", productRouter);
    app.use("/api/cart", cartRouter);

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

