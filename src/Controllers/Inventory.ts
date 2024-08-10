import { Request, Response } from 'express';
import  {ItemI} from "../Models/Item";
import { ObjectId} from "mongodb";
import Item from '../Models/Item';

//Create Item 
export const createItem = async (req: Request, res: Response) => {
    try {
        const { price, stock, description, name } = req.body;

        if (!price || !stock || !description || !name) return  res.status(400).send({message: 'Bad request'})
        const user  = req.user;
        const item = new Item({
            price,
            description,
            stock,
            name,
            createdBy : user._id,
        });
        await item.save();
        res.status(201).json({ message: 'Inventory created successfully', item });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went wrong', error });
    }
};
// get items
export const getItems = async (req: Request, res: Response) => {
    try {
        const createdBy = req.user._id;
        const items = await Item.find({createdBy})
        res.status(200).send(items)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// get item by id
export const getItemById = async (req: Request, res: Response) => {
    try {
        const createdBy = req.user._id;
        const {id} = req.params;
        const item = await Item.findOne({_id: id, createdBy});
        if (!item) {
            return res.status(404).json({message: 'Item not found'});
        }
        res.status(200).send(item)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong', error});
    }
}
export const updateItem = async (req: Request, res: Response) => {
    try {
        const createdBy = req.user._id;
        const { id } = req.params;
        const itemData = Object.keys(req.body);
        const item : ItemI | null = await Item.findOne({_id: id, createdBy})
        if (!item) return  res.status(404).send({message: 'Item does not exist'})
        const updates : string [] = ['price', 'stock', 'name', 'description'];
        const isAllowedUpdates : boolean  = itemData.every(item => updates.includes(item))
        if (!isAllowedUpdates) return  res.status(400).send({message: 'Invalid updates'});
        itemData.forEach((data : string) => (item as any)[data] = req.body[data]);
        await item!.save()
        res.status(200).send({message: 'Item Updated Successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteItem = async (req : Request, res: Response) => {
        try {
            let {id} = req.params;
            const createdBy =  req.user._id;
            const item : ItemI | null  = await Item.findOne({_id:  id, createdBy });
            if (!item) return res.status(404).send({message: "item not found"});
            await Item.findByIdAndDelete(id)
            res.status(200).send({message: 'Item has been deleted Successfully'});
        }
        catch (e) {
            res.status(500).send({message:  'Internal Server Error', e})
        }
}