const mongoose=require('mongoose')
const Person=require('../models/PersonSchema')
const Product=require('../models/ProductSchema');
const authorize=require('../middleware/authorize');
async function productController(fastify,options)
{
    fastify.route({
        method:'POST',
        url:'/new_product',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            if(req.body.product_image===null || req.body.quantity===null || req.body.variety===null || req.body.price===null || req.body.availability_date===null || req.body.expiry_date===null)
            {
                res.send({message:'Details misssing'})
            }
            else
            {
               
                const product=new Product({
                    product_name:req.body.product_name,
                    category:req.body.category,
                    variety:req.body.variety,
                    quantity:req.body.quantity,
                    price:req.body.price,
                    availability_date:req.body.availability_date,
                    expiry_date:req.body.expiry_date,
                    seller_id:req.user._id,
                    product_image:req.body.product_image,
                    quality_certificate:req.body.quality_certificate
                }).save((err,newproduct)=>{
                  if(err)
                  {
                      res.send(err)
                  }
                  else
                  {
                    Person.findByIdAndUpdate(req.user._id,{$push:{
                        my_product:newproduct._id
                    }},{new:true}).exec((errr,results)=>{
                        if(errr)
                        {
                            res.send(errr)
                        }
                        else{
                            res.send({message:'New product added to the list'})
                        }
                    })
                  }
                })
            }
        }

    })
    fastify.route({
        method:'GET',
        url:'/all_product',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Product.find({}).exec((err,result)=>{
                if(err)
                {
                    res.send({message:"Something went wrong"})
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
        url:'/my_product',
        preValidation:(req,res,done)=>authorize(req,res,done),
        handler:(req,res)=>{
            Product.find({seller_id:req.user._id}).exec((err,result)=>{
                if(err)
                {
                    res.send({message:"Something went wrong"})
                }
                else
                {
                    res.send(result)
                }
            })
        }
    })

}
module.exports=productController;