import { cartModel } from "../models/cart.model.js"
import { ticketModel } from "../models/ticket.model.js";

export default class CartDAO {
    getAll = async () => await cartModel.find();
    getById = async (id) => await cartModel.findById(id);
    getByIdPopulate = async (id) => await cartModel.findById(id).populate('products.productId');
    create = async (data) => await cartModel.create(data);
    createTicket = async (data) => await ticketModel.create(data);
    update = async (id, data) => await cartModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
    delete = async (id) => await cartModel.findByIdAndDelete(id);
}