
import { Router } from 'express'

import { createCartController, deteleCartController, editCartIdController, getCartController, getCartIdController } from '../controllers/cart.controller.js'

const router = Router()

router.post('/', createCartController)

router.get('/', getCartController)

router.get('/:cid', getCartIdController)

router.put('/:cid', editCartIdController)

router.delete('/:pid', deteleCartController)

export default router