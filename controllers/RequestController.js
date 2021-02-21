const mongoose=require('mongoose')
const authorize=require('../middleware/authorize');
const Person=require('../models/PersonSchema');
const Product=require('../models/ProductSchema');
async function RequestController(fastify,options){
    fastify.route({
        method:'POST',
        url:'/product_enquiry',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Person.findByIdAndUpdate(req.body.seller_id,{$push:{
                others_enquiry:{
                    product_name:req.body.product_name,
                    message:req.body.message,
                    mobile_number:req.body.mobile_number,
                    sender_id:req.user._id
                }
            }},{new:true}).exec((err,result)=>{
                if(err)
                {
                    res.send({message:"Somethong went wrong"})
                }
                else
                {
                    Person.findByIdAndUpdate(req.user._id,{$push:{
                        my_enquiry:{
                            product_name:req.body.product_name,
                            message:req.body.message,
                            mobile_number:req.body.mobile_number ,
                            enquired_product:req.body.enquired_product
                        }
                    }},{new:true}).exec((eer,result)=>{
                        if(eer)
                        {
                            res.send({message:"Somethong went wrong"})
                        }
                        else
                        {
        
                            res.send({message:"Enquiry sent"})
                        }
    
                    })

                }
               
               
            })
        }
    })
    fastify.route({
        method:'POST',
        url:'/product_buy_request',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Person.findByIdAndUpdate(req.body.seller_id,{$push:{
                others_buy_request:{
                    product_name:req.body.product_name,
                    cost:req.body.cost,
                    unit:req.body.unit,
                    price_validity_date:req.body.price_validity_date,
                    quality_terms:req.body.quality_terms,
                    mobile_number:req.body.mobile_number,
                    sender_id:req.user._id
                }
            }},{new:true}).exec((err,result)=>{
                if(err)
                {
                    res.send({message:"Somethong went wrong"})
                }
                else
                {
                    Person.findByIdAndUpdate(req.user._id,{$push:{
                        my_buy_request:{
                            product_name:req.body.product_name,
                            cost:req.body.cost,
                            unit:req.body.unit,
                            price_validity_date:req.body.price_validity_date,
                            quality_terms:req.body.quality_terms,
                            mobile_number:req.body.mobile_number,
                            buy_request_product:req.body.buy_request_product
                        }
                    }},{new:true}).exec((errr,results)=>{
                        if(errr)
                        {
                            res.send({message:'Something went wrong'})
                        }
                        else
                        {
                            res.send({message:'Buy Request sent'})
                        }
                    })

                  
                }
            })
        }
    })
    fastify.route({
        method:'GET',
        url:'/requested_product',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Person.findById(req.user._id,"requested_product").populate('requested_product').exec((err,result)=>{
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    res.send(result)
                }
            })
        }
    })
    fastify.route({
        method:'GET',
        url:'/enquired_product',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Person.findById(req.user._id,"enquired_product").populate('enquired_product').exec((err,result)=>{
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    res.send(result)
                }
            })
        }
    })
    fastify.route({
        method:'GET',
        url:'/myinfo',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Person.findById(req.user._id,(err,result)=>{
                if(err)
                {
                    res.send({message:'Something went wrong'})
                }
                else
                {
                    res.send(result)
                }
            })
        }
    })
  

}
module.exports=RequestController;