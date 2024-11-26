import express from 'express'
import { generateShortUrl, getUrlStats, redirectToOriginalUrl } from '../controllers/urlController.js'
export const urlRouter = express.Router()
 
urlRouter.post("/shorten",generateShortUrl)
urlRouter.get("/:shortId",redirectToOriginalUrl)
urlRouter.get("/stats/:shortId",getUrlStats)