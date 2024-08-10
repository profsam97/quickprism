import { IUser } from "../../Models/User";
declare module 'express-serve-static-core'{
    interface Request{
        user : IUser;
        token : string;
    }
    // interface Application {
    //     close(callback?: () => void): void;
    // }
}
