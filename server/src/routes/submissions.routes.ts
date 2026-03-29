import { Router } from 'express'
import prisma from '../lib/prisma'
import { Status } from '@prisma/client'


const router = Router()

router.post('/', async (req, res)=>{
    try{
        const {problemId, code} = req.body;
        const userId = (req as any).userId;
        const submissions = await prisma.submissions.create({
            data:{
                userId,
                problemId,
                code,
                status:Status.ACCEPTED
            }
        })
        return res.status(201).json(submissions)

    }
    catch(error){
        console.log(error)
    }
})

router.get('/me', async (req, res)=>{
    try {
        const userId = (req as any).userId
        const userSubmissions = await prisma.submissions.findMany({
            where: {userId},
            orderBy:{
                submittedAt:"desc"
            },
            include:{
                problem:{
                    select:{
                        title: true, slug: true
                    }
                }
            }
        }) 
        return res.status(200).json(userSubmissions)       
    } 
    catch (error) {
        console.error(error)
    }
})

export default router