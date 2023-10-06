import { Router } from "express";
import passport from "passport";
import { deleteSessionController, githubController, githubcallbackController, loginUserController, registerUserController } from "../controllers/session.controller.js";

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failRegister' }), registerUserController)

router.post('/login', passport.authenticate('login', { failureRedirect: '/session/failLogin' }), loginUserController)

router.get('/deletesession', deleteSessionController)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), githubController)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubcallbackController)

export default router