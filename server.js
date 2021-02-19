const fastify =require('fastify')({logger:true})
const mongoose=require('mongoose');
const {MONGOURI}=require('./config/key');
const PORT =process.env.PORT || 3000
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false ,
    useCreateIndex:false
});
mongoose.connection.on('connected',()=>{
   fastify.log.info("Mongodb connected")
})
fastify.register(require('fastify-cors'))
fastify.register(require('./routes/first-route'));
fastify.register(require('./controllers/authController'));
fastify.register(require('./controllers/productController'));
fastify.register(require('./controllers/RequestController'));
fastify.listen(PORT,"0.0.0.0",(err,address)=>{
    if(err)
    {
        fastify.log.error(err)
        fastify.exit(1)
    }
    fastify.log.info(`Fastfy server listening on port ${address}`)
})