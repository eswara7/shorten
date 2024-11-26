import { nanoid } from 'nanoid';
import { URL } from '../models/dbSchema.js';
import validator from 'validator';


export async function generateShortUrl(req,res){
    const body = req.body
    if(!body.url || !validator.isURL(body.url)) return res.status(400).json({error:"valid url is required"})
    const shortId = nanoid(6)
    await URL.create({
        shortId:shortId,
        originalUrl:body.url,
    })
    return res.json({id:shortId})
}

export async function redirectToOriginalUrl(req,res){
    const shortId = req.params.shortId;
    try {
       const urlData = await URL.findOne({shortId})
       if (!urlData) return res.status(404).json({ error: "URL not found" });

       urlData.clicks+=1
       urlData.lastAccessed = new Date();
       await urlData.save()
       return res.redirect(urlData.originalUrl)

    } catch (error) {
       res.status(500).json({error:"something went wrong"})
    }
}

export async function getUrlStats(req,res){
    const shortId = req.params.shortId;
   const urlData = await URL.findOne({shortId})
   
   const stats = {
       clicks:urlData.clicks,
       lastAccessed:urlData.lastAccessed
   }
   res.json({stats})
}