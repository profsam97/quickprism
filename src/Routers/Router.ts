import express, {Router} from "express";
import {auth} from "../Middleware/auth";
import {signIn, signUp} from "../Controllers/auth";
import { createItem, deleteItem, getItemById, getItems, updateItem} from "../Controllers/Inventory";
import { createBill, deleteBill, getBillById, getBills, updateBill } from "../Controllers/bill";
const router : Router = express.Router();

// Authentication Routes
router.post('/user/signin',  signIn);
router.post('/user/signup',   signUp);


// Item Route
router.get('/items', auth, getItems);
router.get('/item/:id', auth, getItemById);
router.post('/item', auth, createItem);
router.put('/item/:id', auth, updateItem);
router.delete('/item/:id', auth, deleteItem)

// Bill Route
router.get('/bills', auth, getBills);
router.get('/bill/:id', auth, getBillById);
router.post('/bill', auth, createBill);
router.put('/bill/:id', auth, updateBill);
router.delete('/bill/:id', auth, deleteBill);

export default router;