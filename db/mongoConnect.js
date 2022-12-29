import mongoose from "mongoose";

export const connectToMongoDB =()=>{
    mongoose.set('strictQuery',true)
mongoose.connect('mongodb://localhost:27017/MyApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>{console.log("MongoDB Connect..");
});}


// module.exports={
//     connectToMongoDB
// };
