import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import { urlRouter } from './routes/urlRouter.js';
import { dbConnection } from './dbConnection.js';
import { ratelimiter } from './rateLimiter.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors()) //i'll code frontend later
app.use(ratelimiter)
dbConnection()

app.use("/",urlRouter)
app.use((err,req,res,next)=>{
    return res.status(500).json({messege:"somthing broke!"})
})
app.listen(PORT,()=>console.log(`server running at ${PORT}`))