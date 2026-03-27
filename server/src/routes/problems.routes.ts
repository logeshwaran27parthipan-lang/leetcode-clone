import { Router } from 'express'
import prisma from '../lib/prisma'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.get('/', async (req,res)=>{
    try{
        const Problems= await prisma.problem.findMany()
        res.json(Problems)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})

router.get('/:slug', async (req, res)=>{
    try{
        const Problem = await prisma.problem.findUnique({
            where:{slug: req.params.slug}
        })
        if(!Problem){
        res.status(404).json({message: "Problem not found"})
        return
        }
        res.json(Problem)
    }
    catch(error){
        res.status(500).json({message: "Server Error"})
    }
})
router.post('/', protect, async (req, res)=>{
    try{
        const {title, slug, description, difficulty, tags} = req.body
        const newProblem = await prisma.problem.create({
            data: {
                title,
                slug,
                description,
                difficulty,
                tags
            }
        })
        res.status(201).json(newProblem)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})

export default router