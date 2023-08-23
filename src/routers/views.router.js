import { Router } from "express";
import { renderCartController, renderChatController, renderFailLoginController, renderFailRegisterController, renderLoginController, renderProductsController, renderRegisterController } from "../controllers/view.controller.js";


const router = Router();

const auth = (req, res, next) => {
  if (req.session?.passport) {

    return next()
  }
  return res.status(401).json({ status: 'fail', message: 'Auth error' })
}

router.get("/products", auth, renderProductsController);

router.get("/chat", auth, renderChatController)

router.get("/session/cart", auth, renderCartController);

router.get("/session/login", renderLoginController)

router.get('/session/failLogin', renderFailLoginController)

router.get("/session/register", renderRegisterController)

router.get('/session/failRegister', renderFailRegisterController)

export default router;
