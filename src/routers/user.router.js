
import { Router } from 'express'

import { deleteUserController, deteleUserTimeController, editUserIdController, getUserController, getUserDetailController, getUserIdController } from '../controllers/user.controller.js'

const router = Router()

router.get('/', getUserController)

router.get('/detail', getUserDetailController)

router.get('/:uid', getUserIdController)

router.put('/:uid', editUserIdController)

router.delete('/', deteleUserTimeController)

router.delete('/:uid',deleteUserController)
export default router