import { Router } from "express";
import { getProductsController, getProductsIdController, createProductController, editProductIdController, deleteProductController } from "../controllers/product.controller.js";


const router = Router();

router.get('/', getProductsController)

router.get('/:pid', getProductsIdController)

router.post('/', createProductController)

router.put('/:pid', editProductIdController)

router.delete('/:pid',deleteProductController)

export default router