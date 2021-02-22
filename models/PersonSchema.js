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
    notifications:[{
        type:Object,
        required:true
    }],
    enquires:[{
        type:Object,
        required:true
    }]
 
})
var Person=mongoose.model("person",PersonSchema);
module.exports=Person;