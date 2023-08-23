import { cartModel } from '../models/cart.model.js'
export const createCartController = async (req, res) => {
    try {
        const user = req.body
        const result = await cartModel.create(user)
        res.json({ status: 'success', payload: result })
    }
    catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const getCartController = async (req, res) => {
    try {
        const result = await cartModel.find().lean().exec()
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}
export const getCartIdController = async (req, res) => {
    try {
        const id = req.params.cid
        const result = await cartModel.findById(id).lean().exec()
        if (result == null) {
            res.status(404).json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const editCartIdController = async (req, res) => {
    try {
        const id = req.params.cid
        const products = req.body
        const result = await cartModel.findByIdAndUpdate(id, products, { returnDocument: 'after' })
        if (result == null) {
            return res.status(404), json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const deteleCartController = async (req, res) => {
    try {
        const id = req.params.pid
        const result = await cartModel.findByIdAndDelete(id)
        if (result === null) {
            return res.status(404).json({ status: 'error', error: 'not found' })
        }
        res.json({ status: 'success', payload: result })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}