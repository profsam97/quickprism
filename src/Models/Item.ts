import mongoose from "mongoose";
import {User} from "./User";

export interface ItemI extends mongoose.Document {
    name: string,
    createdBy : mongoose.Types.ObjectId,
    description: string,
    price: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date
}

const InventorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref : User
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true
})

const Item =  mongoose.model<ItemI>('Items', InventorySchema);

export default Item;