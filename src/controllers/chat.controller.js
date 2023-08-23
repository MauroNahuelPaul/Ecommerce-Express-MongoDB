import { messageModel } from "../models/message.model.js";
export const getMessagesController = async (req, res) => {
    try {
        const messages = await messageModel.find().exec()
        res.json({ status: 'success', payload: messages })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const postMessagesController = async (req, res) => {
    const message = req.body;
    try {
        let result = await messageModel.create(message)
        res.json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }

}