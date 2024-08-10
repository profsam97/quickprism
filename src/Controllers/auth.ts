
import {Request, Response} from "express";
import {IUser, User} from "../Models/User";

export const signUp = async (req : Request, res: Response) => {
    try {
        const {password, username} = req.body;
        if (!password || !username) return res.status(400).send({message: 'You need to setup a password and username'});
        const userExist: IUser | null = await User.findOne({username});
        if (userExist) return res.status(400).send({message: 'User Already Exist'})
        // if(username.length < 6 || password.length < 6) return res.status(400).send({Message : "Username and passsword must contain at least 6 characters"}) 
        const user = new User({password, username})
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({message: 'User successfully saved', token})
    }
    catch (e) {
        console.log(e)
        res.status(500).send({message: 'Internal server Error', e})
    }
}

export const signIn = async (req : Request, res : Response) => {
    try {

    const {password, username} = req.body;
    const userExist : IUser | null = await User.findOne({username});
    if (!userExist) return res.status(401).send({message: "You don't have an account with us, pls register"});
    const authUser = await userExist.verifyPassword(userExist, password);
    if (!authUser) return res.status(401).send({"Message" : "Invalid Username or Password"})
    const token = await authUser.generateAuthToken();
    res.status(200).send({token})

    }
    catch (e) {
        console.log(e)
        res.status(500).send({"Message": e})
    }
}
