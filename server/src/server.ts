import express from 'express'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const PORT=process.env.PORT || 4000

app.get('/api/health', (req : Request, res : Response)=>{
    res.json({status:'ok'})
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})