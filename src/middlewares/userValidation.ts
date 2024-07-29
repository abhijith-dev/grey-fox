import {NextFunction,Request,Response} from 'express';
import Joi,{ ValidationError } from 'joi';

const userValidationSChema =Joi.object({
    username:Joi.string().min(3).max(10),
    emailAddress:Joi.string(),
    password:Joi.string().pattern(new RegExp('[a-z]')),
    location:Joi.string(),
    phoneNumber:Joi.string(),
    deviceInfo:Joi.string()
})

export default async function(req:Request,res:Response,next:NextFunction){
   if(!req.body){
      return res.status(400).json({
         message:'Invalid request body',
         status:400
      });
    }
    if(Object.keys(req.body).length <= 0 ){
        return res.status(400).json({
           message:'Empty request body',
           status:400
        });
    }

    const { 
        username,
        emailAddress,
        phoneNumber,
        location,
        deviceInfo,
        password
     } = req.body
     
     if(!username || !emailAddress || !phoneNumber || !location || !deviceInfo || !password){
      return res.status(400).json({
         message:'Invaild Request',
         status:400
      });
     }
     try {
        await userValidationSChema.validateAsync(req.body);
        next();
     } catch (error:unknown ) {
        const err :ValidationError = error as ValidationError;
        if(error instanceof Error){
         return res.status(400).json({
            message:err.details[0].message,
            status:400
         });
        }
     }
}