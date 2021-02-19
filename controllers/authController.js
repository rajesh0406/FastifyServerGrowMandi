const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/key');
const Bcrypt=require('../services/bcrypt');
const Person =require('../models/PersonSchema');

async function AuthController(fastify,options){
    fastify.post('/signup',async (req,res)=>{
        Person.findOne({mobile_number:req.body.mobile_number},(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            else if(result){
                res.send({message:"Mobile Number already exist"})

            }
            else
            {
                const hashpassword=Bcrypt.generateHash(req.body.password);

                const person=new Person({
                    name:req.body.name,
                    mobile_number:req.body.mobile_number,
                    state:req.body.state,
                    category:req.body.category,
                    password:hashpassword,
                    profilePic:req.body.profilePic
                }).save((err2,result2)=>{
                    if(err2)
                    {
                        fastify.log.info(err2)
                    }
                    else
                    {
                        fastify.log.info(result2)
                    }
                })
                res.send({success:"New Entry created"})
            }
        })
        
    })
    fastify.post('/login',async (req,res)=>{
        Person.findOne({mobile_number:req.body.mobile_number},(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            else if(!result)
            {
                res.send({message:'Mobile Number not found.Sign up'})
            }
            else
            {
                if(!Bcrypt.comparePassword(req.body.password,result.password))
                {
                    res.send({message:'Invalid Password'})
                }
                else
                {
                    const token=jwt.sign({_id:result._id},JWT_SECRET);
                    res.send({token:token,user:result})
                }
            }
        })
    })
}
module.exports=AuthController;