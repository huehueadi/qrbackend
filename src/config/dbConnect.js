import mongoose from "mongoose";

const connectionDatabase = async()=>{
    try {
         await mongoose.connect("mongodb://localhost:27017/qr-test", {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
         console.log("Database is connected")
    } catch (error) {
        console.log("Error while Connection to the Database", error)
    }
}
export default connectionDatabase