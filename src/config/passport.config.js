import passport from "passport";
import local from 'passport-local'
import { UserModel } from "../models/user.model.js";
import { cartModel } from "../models/cart.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {

        try {

            const { first_name, last_name, email, age } = req.body
            const user = await UserModel.findOne({ email: username.toLowerCase() })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }
            const userNew = {
                first_name,
                last_name,
                age,
                email: email.toLowerCase(),
                password: createHash(password)
            }
            const result = await UserModel.create(userNew)     
            const userCart = await cartModel.create({_id:JSON.parse(JSON.stringify(result._id))})

            return done(null, result)
        } catch (err) {
            return done('error el obtener el user')
        }

    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username.toLowerCase() })

            if (!user) {
                return done(null, false)
            }

            if (!isValidPassword(user, password)) {
                return done(null, false)
            }

            return done(null, user)
        } catch (err) {

        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.813ade5bb783f649',
        clientSecret: '24102c3c5bf3fcb6a66f0f6d05b203a02f24e09c',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({ email: profile._json.email })
            if (user)
                return done(null, user)
            const userNew = await UserModel.create({
                first_name:profile._json.name || profile._json.login,
                last_name:' ',
                age:0,
                email:profile._json.email,
                password:' '
            })
            return done(null,userNew)
        } catch (err) {
            return done(`Error to login with GitHub => ${err.message}`)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}
export default initializePassport