import { CartService, ProductService } from '../services/index.js'
import { ticketModel } from '../models/ticket.model.js'
export const createCartController = async (req, res) => {
    try {
        const user = req.body
        const result = await CartService.create(user)
        res.json({ status: 'success', payload: result })
    }
    catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const getCartController = async (req, res) => {
    try {
        const result = await CartService.getAll()
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}
export const getCartIdController = async (req, res) => {
    try {
        const id = req.params.cid
        const result = await CartService.getById(id)
        if (result == null) {
            res.status(404).json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const getCartIdPurchaseController = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartService.getById(cartId);

        if (!cart) {
            throw new Error("Cart not found");
        }

        const productosAprobados = [];
        const productosDesaprobados = [];
        for (const productCart of cart.products) {
            const productId = productCart.product;
            const cantidadABajar = productCart.quantity;
            const product = await ProductService.getById(productId);

            if (!product) {
                throw new Error("Product not found");
            }

            if (product.stock >= cantidadABajar) {

                product.stock -= cantidadABajar;
                await product.save();

                productosAprobados.push({
                    product: product,
                    quantity: cantidadABajar,
                });

            } else {
                productosDesaprobados.push({
                    product: product._id,
                    quantity: cantidadABajar,
                });
            }
        }
        if (productosAprobados.length > 0) {

            let total = 0
            productosAprobados.forEach((product) => total += product.product.price)
            const result = await ticketModel.create({
                code: req.user._id + new Date(),
                purchase_datetime: new Date(),
                amount: total,
                purchaser: req.user.email,
                products: productosAprobados
            })

            CartService.update(cart._id, { "products": productosDesaprobados })

            res.status(200).json({ status: "success", payload: result });
        } else {
            res.status(400).json({ status: "error", message: "No products could be purchased", failedProducts: productosDesaprobados });
        }


    } catch (error) {

        return res.status(500).json({ status: "error", error: error.message });
    }
}

export const editCartIdController = async (req, res) => {
    try {
        const id = req.params.cid
        const products = req.body
        const result = await CartService.update(id, products)
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
        const result = await CartService.delete(id)
        if (result === null) {
            return res.status(404).json({ status: 'error', error: 'not found' })
        }
        res.json({ status: 'success', payload: result })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}