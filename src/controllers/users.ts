import {Request,Response} from 'express';

const userControllers = {
    onboard : async(req:Request,res:Response) => { 
       return res.status(201).json(req.body);
    }
};

export default userControllers;