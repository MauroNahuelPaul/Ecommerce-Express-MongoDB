import mongoose from "mongoose";
const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    last_time_login: { type: Date }
})

mongoose.set("strictQuery", false);
export const UserModel = mongoose.model(usersCollection, userSchema)