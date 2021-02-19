const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/key');
const mongoose=require('mongoose');
const Person =require('../models/PersonSchema');

module.exports=(req,res,done)=>
{
    const {authorization}=req.headers
    if(!authorization)
    {
        res.send(401).json({message:"You must be logged in"});
    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,result)=>{
        if(err)
        {
            res.send(401).json({message:"You must be logged in"});
        }
        const {_id}=result;
        Person.findById({_id},(err,results)=>{
            if(err)
            {
                res.send("Something went wrong");
            }
            else{
                req.user=results;
            }
            done();
        });
       
    });
}