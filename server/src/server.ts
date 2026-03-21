import express from 'express'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import authRouter from './routes/auth.routes'
import problemsRouter from './routes/problems.routes'
import submissionsRouter from './routes/submissions.routes'
import {protect} from './middleware/auth.middleware'


dotenv.config()

const app = express()
const PORT=process.env.PORT || 4000

app.use(express.json());//acts as middleman converts raw text to jsobjects from the apiroutes

//health check
app.get('/api/health', (req : Request, res : Response)=>{
    res.json({status:'ok'})
})

app.use('/api/auth', authRouter)
app.use('/api/problems', problemsRouter)
app.use('/api/submissions', protect, submissionsRouter)


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})