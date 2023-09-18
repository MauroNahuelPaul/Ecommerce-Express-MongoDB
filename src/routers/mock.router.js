import { createProductController } from "../controllers/mock.controller.js";
import { Router } from "express";

const router = Router()

router.get("/", createProductController)



export default router