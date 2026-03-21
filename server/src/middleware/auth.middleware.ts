import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const protect =(req:Request, res:Response, next:NextFunction)=>{
    const header=req.headers.authorization
    if(!header || !header.startsWith("Bearer ")){
        res.status(401).json({message: "invalid request"})
        return
    }
    const token= header.split(' ')[1]
    try{
        const isVerifyToken = jwt.verify(token,process.env.JWT_SECRET as string);
        (req as any).userId= (isVerifyToken as any).userId       
        next()
    }
    catch{
        res.status(401).json({message:"Something went wrong"})
    }
}