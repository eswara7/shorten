let requestcount =0
setInterval(()=>{
  requestcount = 0;
},3000)
export function ratelimiter(req,res,next){
    requestcount++;
    if(requestcount<50){
      next()
    }
    else{
      res.status(404).json({
        msg:"your limit reached"
      })
  }
  }
