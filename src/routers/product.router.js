import { Router } from "express";
import { productModel } from "../models/product.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {

        const limit = req.query.limit
        const products = await productModel.find().limit(limit).lean().exec()
        
        res.json({ status: 'success', payload: products })

    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        const result = await productModel.findById(id).lean().exec()
        if (result == null) {
            res.status(404).json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const result = await productModel.create(product)
        res.json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        const data = req.body
        const result = await productModel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
        if (result == null) {
            return res.status(404), json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})
router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        const result = await productModel.findByIdAndDelete(id)
        if (result === null) {
            return res.status(404).json({ status: 'error', error: 'not found' })
        }
        res.json({ status: 'success', payload: result })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
})

export default router