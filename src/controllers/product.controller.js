import { ProductService } from "../services/index.js";
import CustomError from "../services/errors/custom_error.js";

export const getProductParams = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1
        const sort = req.query.sort === "desc" ? -1 : 1
        const query = req.query.query || {};

        const filter = {};

        if (query.category) {
            filter.category = query.category;
        }

        if (query.availability) {
            filter.availability = query.availability;
        }

        const options = {
            page,
            limit,
            sort: { price: sort },
            lean: true,
        };
        const result = await ProductService.getFilter(filter, options)

        const totalCount = result.totalDocs;
        const totalPages = result.totalPages;
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPrevPage ? page - 1 : null;
        const prevLink = hasPrevPage
            ? `http://localhost:8080/products?page=${prevPage}&limit=${limit}`
            : null;
        const nextLink = hasNextPage
            ? `http://localhost:8080/products?page=${nextPage}&limit=${limit}`
            : null;

        res.status(200).json({
            status: "success",
            payload: result.docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        })
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message });
    }
}

export const getProductsController = async (req, res) => {
    try {
        const products = await ProductService.getAll()

        res.json({ status: 'success', payload: products })

    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const getProductsIdController = async (req, res) => {
    try {
        const id = req.params.pid
        const result = await ProductService.getById(id)
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
        if (!product.title || !product.description || !product.price || !product.code || !product.status || !product.stock || !product.category) {
            return CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo(product),
                message: "Error typing to create a product",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }
        const result = await ProductService.create(product)
        res.json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const editProductIdController = async (req, res) => {
    try {
        const id = req.params.pid
        const data = req.body
        const result = await ProductService.update(id, data)
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
        const result = await ProductService.delete(id)
        if (result === null) {
            return res.status(404).json({ status: 'error', error: 'not found' })
        }
        res.json({ status: 'success', payload: result })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}