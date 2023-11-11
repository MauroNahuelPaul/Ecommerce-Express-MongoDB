import { getIdPurchaseController, getPurchaseByEmailController } from "../controllers/ticket.controller.js";
import { Router } from 'express'

const router = Router()

router.get('/:tid', getIdPurchaseController)
router.get('/', getPurchaseByEmailController)

export default router