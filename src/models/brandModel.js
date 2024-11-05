import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    created_at:{
        type:String,
        required:true
    },
    updated_at:{
        type:String,
        required:true
    }
})

const Brand = mongoose.model("Brand", brandSchema)

export default Brand