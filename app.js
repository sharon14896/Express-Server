import express from "express";
//גישה לנתיב תקייה כלשהי
import path from "path"
import { routesInit } from "./routes/ConfigRouts.js";


const app = express();
//נותן את הגישה לתגובה של הגייסון מהשרת 
app.use=express();

//הגדרת הפורט שאליו מאזינים
const port=process.env.PORT||3000;

routesInit(app)


app.listen(port,()=>{
    console.log(`listenig on ${port}`);
})

















//פןנקציה להאזנה לפורט 
app.listen(port,()=>{
    console.log(`listenig on ${port}`)
})
