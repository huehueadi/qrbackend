import mongoose from "mongoose";

const connectionDatabase = async()=>{
    try {
         await mongoose.connect("mongodb+srv://temploginoffice:vHkZ1dKCANgFFLXe@cluster0.ivmfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
         console.log("Database is connected")
    } catch (error) {
        console.log("Error while Connection to the Database", error)
    }
}

export default connectionDatabase