const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const ProductSchema =mongoose.Schema({
    seller_id:{
        type:ObjectId,
        ref:'person'
    },
    product_name:{
        type:String,
        required:true
    },
    product_image:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    variety:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    availability_date:{
        type:String,
        required:true
    },
    expiry_date:{
        type:String,
        required:true
    },
    quality_certificate:{
        type:String,
        default:'Not Available'
    },
    location:{
        type:String,
        required:true
    },
    available_flag:{
        type:String,
        default:"Available"
    },
   
})
var Product=mongoose.model("product",ProductSchema);
module.exports=Product;