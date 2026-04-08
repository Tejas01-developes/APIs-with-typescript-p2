import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type reqdata = JwtPayload &{
    id?:string
}

export const cookiefilter=(req:JwtPayload,resp:Response,next:NextFunction)=>{
    const refreshcookie=req.cookies.refresh;

    if(!refreshcookie){
        return resp.status(400).json({success:false,message:"cokkie not avalible in cookie"})
    }
    try{
   const decode= jwt.verify(refreshcookie,process.env.REFRESH_KEY as string) as reqdata
       
        req.id=decode.id;
        next();
    }catch(err){
         throw new Error("refresh token filter failed")
    }
}
