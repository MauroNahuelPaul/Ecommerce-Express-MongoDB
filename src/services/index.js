import ProductDAO from '../Dao/product.mongo.dao.js'
import CartDAO from '../Dao/cart.mongo.dao.js'
import UserDAO from '../Dao/user.mongo.dao.js'
import ChatDao from '../Dao/chat.mongo.dao.js'

import ProductRepository from '../repositories/product.repository.js'
import CartRepository from '../repositories/cart.repository.js'
import UserRepository from '../repositories/user.repository.js'
import ChatRepository from '../repositories/chat.repository.js'


export const ProductService = new ProductRepository(new ProductDAO())
export const CartService = new CartRepository(new CartDAO())
export const UserService = new UserRepository(new UserDAO())
export const chatService = new ChatRepository(new ChatDao())