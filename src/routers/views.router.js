import { Router } from "express";
import { realTimeProductsViewController, renderCartController, renderChatController, renderFailLoginController, renderFailRegisterController, renderLoginController, renderProductsController, renderRegisterController, usersViewController } from "../controllers/view.controller.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";


const router = Router();

const auth = (req, res, next) => {
  if (req.session?.passport) {

    return next()
  }
  return res.status(401).json({ status: 'fail', message: 'Auth error' })
}

router.get("/products", handlePolicies(["ADMIN", "PREMIUM", "USER"]), renderProductsController);
router.get("/realtimeproducts", handlePolicies(["ADMIN", "PREMIUM"]), realTimeProductsViewController)

router.get("/chat", handlePolicies(["ADMIN", "PREMIUM", "USER"]), renderChatController)

router.get("/users", handlePolicies(["ADMIN"]), usersViewController)

router.get("/session/cart", handlePolicies(["ADMIN", "PREMIUM", "USER"]), renderCartController);

router.get("/session/login", renderLoginController)

router.get('/session/failLogin', renderFailLoginController)

router.get("/session/register", renderRegisterController)

router.get('/session/failRegister', renderFailRegisterController)

export default router;
