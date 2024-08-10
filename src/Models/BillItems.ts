import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface BillItemsI extends mongoose.Document {
    item_id: mongoose.Types.ObjectId,
    quantity: number,
    price: number,
    payment_status: string,
    customerName: string,
    createdAt: Date,
    updatedAt: Date
}

const BillItemSchema = new mongoose.Schema({
    bill_id : {
        type: mongoose.Types.ObjectId,
    },
    item_id:  {
         type:mongoose.Types.ObjectId,
         required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    paymentStatus: {
        type: String,
        trim: true,
        default: 'Unpaid'
    }

}, {
    timestamps: true
})

const BillItem =  mongoose.model<BillItemsI>('BillItems', BillItemSchema);

export default BillItem;