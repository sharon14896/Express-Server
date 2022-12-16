//יבוא ויצוא באקספרס ללא אקמה סקריפט
//const express=require("express");
//export =num=50

import express from "express";
//הרצת הפונקציה שמחזירה את היכולות של האקספרס 
const app = express();

//הגדרת הפורט שאליו מאזינים
const port=process.env.PORT||3000;
//סוגי בקשות 
//"GET ,POST,PUT,DELETE,PATCH"
//GET-בקשה לקבלת מידע
//POST-בקשה להכנסת מידע
//PUT-בקשה לעריכת מידע
//DELETE-בקשה למחיקת מידע
//PATCH-בקשה לעדכון קטן 

//הקולבק מקבלת שני פרמטרים ריקווסט ורספונס 
//מהריקוסט נאסף נתונים הקושרים לבקשה
//מרספונס משתמשים להחזרת של התשובה 
//ראוט שמחזיר טקסט 
app.get('/server',(req,res)=>{

    res.send("hello")
})


app.get('*',(req,res)=>{

    res.send(`<h1>404 not found</h1>`)
})















//פןנקציה להאזנה לפורט 
app.listen(port,()=>{
    console.log(`listenig on ${port}`)
})
