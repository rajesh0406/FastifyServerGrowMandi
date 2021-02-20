async function firstRoute(fastify,options){
    fastify.get('/first-route',async (req,res)=>{
        res.send({route:"first-route-changed"})

    })
  
}
module.exports=firstRoute;