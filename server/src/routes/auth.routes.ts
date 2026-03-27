import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from '../lib/prisma'
import jwt from "jsonwebtoken";



const router = Router()

router.post('/register', async (req, res)=>{
    try{
    const {email, username, password} = req.body  //get values
    if((!email || !username || !password) ){
        return res.status(400).json({message:"All fields are required"})
    }
    if(password.length<8){
        return res.status(400).json({message:"Password must be at least 8 characters"})
    }
        if(!/[!@#$%^&*]/.test(password)){
        return res.status(400).json({message: "Password must contain at least one special character"})
    }

    const hashedPassword = await bcrypt.hash(password, 10) //hash password
    const user = await prisma.user.create({
        data: {
            email,
            username,
            passwordHash: hashedPassword
        }
    })//saves to db
    const token= jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET as string,
        {expiresIn:'7d'}
    )   //jwt token

    res.status(201).json({token,user:{
        id:user.id,
        email:user.email
    }})//status check
}
catch(error){
    console.error(error)
    res.status(500).json({message: 'Something went wrong'})
}

})

router.post('/login', async (req,res)=>{

    try{
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where:{email}
    })
    if(!user){
        res.status(401).json({message: 'invalid email or password'})
        return
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if(!isMatch){
        res.status(401).json({message: 'Invalid email or password'})
        return
    } 

    const token = jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET as string,
        {expiresIn: '7d'}
    )

    res.status(200).json({token})

    }
    catch(error){
        console.error(error)
        res.status(500).json({message: 'Something went wrong'})
    }

})

export default router