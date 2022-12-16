import express from "express";
//הרצת הפונקציה שמחזירה את היכולות של האקספרס 
const app = express();

//הגדרת הפורט שאליו מאזינים
const port=process.env.PORT||3000;

//מרספונס משתמשים להחזרת של התשובה 
//ראוט שמחזיר טקסט 
app.get('/color',(req,res)=>{
    const color=["Black","red","Green","Brown","Pink","Purple","Blue","Orange"]
    res.json(color)
})
app.get('/toys',(req,res)=>{
    const toys=[
         {Name:"Ball" ,Price: 5}
        ,{Name:"Bicycle" ,Price: 512}
        ,{Name:"Teddybear" ,Price: 155}
        ,{Name:"Doll" ,Price: 222}
        ,{Name:"car" ,Price: 333}]
    res.send(toys)
})
app.get('/name',(req,res)=>{
    const name=["sharon","yarin","michael","Ben","Effi","Elad","Amit","Shlomi"]
    res.json(name)
})



import userRoute from "./UserRoutes.js"
app.use('/user',userRoute)

app.get('*',(req,res)=>{

    res.send(`<h1>404 not found</h1>`)
})















//פןנקציה להאזנה לפורט 
app.listen(port,()=>{
    console.log(`listenig on ${port}`)
})
