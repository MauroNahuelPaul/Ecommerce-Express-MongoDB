import { Router } from "express";
import { getMessagesController, postMessagesController } from "../controllers/chat.controller.js";

const router = Router();

router.get('/', getMessagesController)

router.post('/', postMessagesController)

export default router
