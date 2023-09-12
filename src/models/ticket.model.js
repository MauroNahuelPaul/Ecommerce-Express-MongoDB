import mongoose from "mongoose";
const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: {
        type: [{
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number,
        }],
        default: []
    }
})

mongoose.set("strictQuery", false);
export const ticketModel = mongoose.model(ticketCollection, ticketSchema)