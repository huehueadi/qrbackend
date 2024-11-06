import mongoose from "mongoose";

const scanAnalyticsSchema = new mongoose.Schema({
    qrCodeId:{
        type:String, 
        required:true
    },
    scan_time:{
        type:String,
        required:true
    },
    device_type:{
        type:String,
        required:true
    },
    ip_address:{
        type:String,
        required:true
    },
    location:{
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    redirection_link:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Qr",
        required:true
    },
})

const Analytics = mongoose.model("Analytics", scanAnalyticsSchema)

export default Analytics