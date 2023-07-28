import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import viewsProductsRouter from "./routers/views.router.js";
import productRouter from "./routers/product.router.js"
import sessionRouter from "./routers/session.router.js"
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views")
app.set('view engine', 'handlebars')

const MONGO_URI = 'mongodb+srv://mauro:mauro@ecommerce.wnnj4ej.mongodb.net/'
const MONGO_DB_NAME = 'clase19'


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
        secret: 'pepe',
        resave: true,
        saveUninitialized: true
    }))

    initializePassport()
    app.use(passport.initialize())
    app.use(passport.session())

    app.use("/", viewsProductsRouter);

    app.use('/api/session',
        sessionRouter
    );
    app.use("/api/products",
        productRouter
    );


    app.listen(8080, () => console.log("Server up"))

} catch (err) {
    console.log(err)
}

