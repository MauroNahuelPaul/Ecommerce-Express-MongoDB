import { messageModel } from "../models/message.model.js"

export default class ChatDao {
    getAll = async () => await messageModel.find().exec();
    create = async (message) => await messageModel.create(message)
}