import { Request, Response } from 'express';
import { ObjectId} from "mongodb";
import Item from '../Models/Item';
import  { BillItemsI } from '../Models/BillItems';
import BillItem from '../Models/BillItems';
import { isObjectIdOrHexString, Types } from 'mongoose';
type Tuser = {
    _id: string,
    username: string
}


//Create bill 
export const createBill = async (req: Request, res: Response) => {
    try {
        const { items, quantity, name } = req.body;
        if(!items || !quantity || !name) return res.status(400).send({"Message" : "Please provide all details"})
        let len : number = items?.length;
        if(!len || !quantity || !name) return res.status(400).send({"Message" : "Bad Request"}) 
        for (len; len--;) {
            let item_id : number = items[len];
            if(!isObjectIdOrHexString(item_id)) {
                return res.status(400).send({"Message" : "Please input a valid Item, e.g ['66b721b3bf87251645137bf8']"})
            }
            let item = await Item.findById(item_id);
            if (!item) return res.status(400).send({"Message" :   item_id  + "Does not exist in our record"});
            const {price, stock} = item;
            if(quantity > stock) return res.status(400).send({"Message" : "Stock is not enough for this item"})
            const billitem : BillItemsI = new BillItem({
                price,
                quantity,
                item_id,
                customerName: name,

            })
            await billitem.save();
            item.stock = stock - quantity;
            await item.save();
        }

        res.status(201).json({ message: 'Bill created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
// get bills
export const getBills = async (req: Request, res: Response) => {
    try {
        const createdBy = req.user._id;
        const billitems : BillItemsI[] = await BillItem.find().populate({
            path: 'item_id',
            model: Item,
            match: {createdBy}
        })
        
        const totalAmount = billitems.reduce((index, bill) => bill.price * bill.quantity + index, 0);
        const data = {
            ...billitems,
            totalAmount
        }
        res.status(200).send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// get bill by id
export const getBillById = async (req: Request, res: Response) => {
    try {
        const createdBy = req.user._id;
        const {id} = req.params;
        let bill = await BillItem.findOne({_id: id}).populate({
            path: 'item_id',
            model: Item,
            match: {createdBy}
        });
        if (!bill) {
            return res.status(404).json({message: 'Bill not found'});
        }
            let billDetail  = {
                bill,
                totalAmount: bill.price * bill.quantity
            }
        res.status(200).send(billDetail)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong', error});
    }
}
export const updateBill = async (req: Request, res: Response) => {
    try {
        const createdBy = req.user._id;
        const { id } = req.params;
        const billData = Object.keys(req.body);
        if(billData.length === 0) return res.status(400).send("Invalid Updates") 
        const bill : BillItemsI | null = await BillItem.findOne({_id: id}).populate({
            path: 'item_id',
            model: Item,
            match: createdBy
        })
        if (!bill) return  res.status(404).send({message: 'Bill does not exist'})
        
        const updates : string [] = ['paymentStatus', 'customerName'];
        const isAllowedUpdates : boolean  = billData.every(bill => updates.includes(bill))
        if (!isAllowedUpdates) return  res.status(400).send({message: 'Invalid updates'});
        billData.forEach((data : string) => (bill as any)[data] = req.body[data]);
        await bill!.save()
        res.status(200).send({message: 'Bill Updated Successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// delete a bill
export const deleteBill = async (req : Request, res: Response) => {
        try {
            let {id} = req.params;
            const createdBy = req.user._id;
            const bill : BillItemsI | null  = await BillItem.findOne({_id: id}).populate({
                path: 'item_id',
                model: Item,
                match: createdBy
            });
            if (!bill) return res.status(404).send({message: "Bill not found"});
            await BillItem.findByIdAndDelete(id)
            res.status(200).send({message: 'Bill has been deleted Successfully'});
        }
        catch (e) {
            res.status(500).send('Internal Server Error')
        }
}