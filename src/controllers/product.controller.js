import { productModel } from "../models/product.model.js";


export const getProductsController = async (req, res) => {
    try {

        const limit = req.query.limit
        const products = await productModel.find().limit(limit).lean().exec()

        res.json({ status: 'success', payload: products })

    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}
export const getProductsIdController = async (req, res) => {
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
}

export const createProductController = async (req, res) => {
    try {
        const product = req.body;
        const result = await productModel.create(product)
        res.json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const editProductIdController = async (req, res) => {
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
}

export const deleteProductController = async (req, res) => {
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
}