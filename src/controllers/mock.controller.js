import { ProductService } from "../services/index.js";
import { generateProduct } from "../services/mockService.js";


export const createProductController = async (req, res) => {
    try {
        for(let i = 0; i < 100; i++ ) {
            await ProductService.create(await generateProduct())
        }
        const products = await ProductService.getAll()
        res.status(200).json({status: "success", payload: products })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: "error", error: error.message })
    }
}
