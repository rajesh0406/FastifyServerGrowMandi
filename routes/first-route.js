async function firstRoute(fastify,options){
    fastify.get('/first-route',async (req,res)=>{
        res.send({route:"first-route-changed-3"})

    })
  
}
module.exports=firstRoute;