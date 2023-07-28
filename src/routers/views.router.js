import { Router } from "express";
import passport from "passport";


const router = Router();

const auth = (req, res, next) => {
  if (req.session?.passport) {

    return next()
  }
  return res.status(401).json({ status: 'fail', message: 'Auth error' })
}

router.get("/products", async (req, res) => {

  if (req.user.email === 'adminCoder@coder.com' && req.user.password === "adminCod3r123")
    req.user.rol = 'Admin'
  else
    req.user.rol = 'User'

  res.render('products', {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    rol: req.user.rol
  });
});


router.get('/session/failLogin', (req, res) => {
  res.send({ error: 'Fail login' })
})
router.get("/session/login", (req, res) => {
  res.render('login')
})
router.get("/session/register", (req, res) => {
  res.render('register')
})
router.get('/session/failRegister', (req, res) => {
  res.send({ error: 'Fail register' })
})



export default router;
