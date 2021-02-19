const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;
const PersonSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile_number:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
    },
    my_product:[{
        type:ObjectId,
        ref:'product'
    }],
    requested_product:[{
        type:ObjectId,
        ref:'product'
    
    }],
    enquired_product:[{
        type:ObjectId,
        ref:'product'
    }],
    enquiry:[{
        product_name:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        mobile_number:{
            type:Number,
            required:true

        }
    }],
    buy_request:[{
        product_name:{
            type:String,
            required:true
        },
        mobile_number:{
            type:Number,
            required:true
        },
        cost:{
            type:Number,
            required:true
        },
        unit:{
            type:String,
            required:true
        },
        price_validity_date:{
            type:String,
            required:true
        },
        quality_terms:{
            type:String,
            default:"Good quality"
        }
    }]
 
})
var Person=mongoose.model("person",PersonSchema);
module.exports=Person;