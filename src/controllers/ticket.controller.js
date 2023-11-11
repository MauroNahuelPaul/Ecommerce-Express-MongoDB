import { ticketModel } from "../models/ticket.model.js";

export const getIdPurchaseController = async (req, res) => {
    try {
        const ticketId = req.params.tid;
        const result = await ticketModel.findById(ticketId)
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {

        return res.status(500).json({ status: "error", error: error.message });
    }
}
export const getPurchaseByEmailController = async (req, res) => {
    try {
        const userEmail = req.user.email
        const result = await ticketModel.find({ purchaser: userEmail })
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {

        return res.status(500).json({ status: "error", error: error.message });
    }
}