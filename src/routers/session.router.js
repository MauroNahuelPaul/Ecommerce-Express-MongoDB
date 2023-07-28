import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/session/failRegister'
}), async (req, res) => {
    res.redirect('/session/login')
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/session/failLogin'
}), async (req, res) => {

    res.redirect('/products')
})

router.get('/deletesession', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'error', message: 'Ocurrio un error' })
        }
        return res.redirect('/session/login')

    })

})
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => {

    })
router.get('/githubcallback', passport.authenticate('github', {
    failureRedirect: '/login'
}), async (req, res) => {
    
    res.redirect('/products')
})

export default router