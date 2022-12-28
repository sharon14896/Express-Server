import express from "express";

const router=express.Router()

    const cakes = [
        {id:1 , type: 'Blueberry Cake', price: 30, category: 'fruit'},
        {id:2 , type: 'Raspberry Cake', price: 25, category: 'fruit'},
        {id:3 , type:'Mango Cake', price: 20, category: 'fruit'},
        {id:4 , type:'Peach Cake', price: 25, category: 'fruit'},
        {id:5 , type:'Apple Cake', price: 20, category: 'fruit'},
        {id:6 , type: 'Vanilla Cake', price: 25, category: 'milk'},
        {id:7 , type: 'Funfetti Cake', price: 20, category: 'milk'},
        {id:8 , type: 'Coconut Cake', price: 35, category: 'milk'},
        {id:9 , type: 'Sponge Cake', price: 15, category: 'milk'},
        {id:10 , type: 'Orange Cake', price: 25, category: 'milk'},
        {id:11 , type: 'Lime Cake', price: 20, category: 'milk'},
        {id:12 , type: 'Chocolate Cake', price: 25, category: 'no sugar'},
        {id:13 , type: 'Red Velvet Cake', price: 30, category: 'no sugar'},
        {id:14 , type: 'Carrot Cake', price: 35, category: 'no sugar'},
        {id:15 , type: 'Lemon Cake', price: 20, category: 'no sugar'},
        {id:16 , type: 'Strawberry Shortcake', price: 15, category: 'no sugar'},
        {id:17 , type: 'Cheesecake', price: 40, category: 'no sugar'},
        {id:18 , type: 'Black Forest Cake', price: 45, category: 'no sugar'},
        {id:19 , type: 'Pineapple Upside-Down Cake', price: 30, category: 'no sugar'},
        {id:20 , type: 'Banana Cake', price: 20, category: 'no sugar'}
      ];

router.get('/',(req,res)=>{
    try {
         res.json(cakes)
    } catch (error) {
        res.status(500).json(err)   
    }
    
})

//ראוטר עבור חיפוש עוגות לפי קטגוריות
router.get('/category/:category',(req,res)=>{
    try {
         //איסוף פארם מהכתובת
    const category=req.params.category;
    console.log(category);
    //פילטר עבור קטגוריה שנבחרה בפארם
    const filterdCaked=cakes.filter(cakes=>cakes.category===category)
    //אם המערך ריק זאת אומרת שלא קיים קטגוריה כזו
    if(!filterdCaked.length)
    //נחזיר גייסון עם הודעה מתאימה בנוסף נוסיף ריטארן בשביל שלא יהיו התנגשויות גייסונים
     return res.status.json(401)({msg_err:`Category${category}not found!`})
    res.json(filterdCaked)
    } catch (error) {
         res.status(500).json(err)   
    }
   
})

router.get('/byPrice',(req,res)=>{
    try {
         //איוסף קווארי מכתובת
    const min=req.query.min
    const max=req.query.max
    //ייצור מערך זמני לפילטור
    let filterdCakedByPrice=[]
    //אם אין מקס ואין מינ
    if(!min&&!max){
        return res.json(cakes)
    }
    //אם אין מקס ויש מינ
    else if(min&&!max){
        filterdCakedByPrice=cakes.filter(cakes=>cakes.price>=min)
        return res.json(filterdCakedByPrice)
    }
    //אם אין מינ ויש מקס
    else if(!min&&max){
        filterdCakedByPrice=cakes.filter(cakes=>cakes.price<=max)
        return res.json(filterdCakedByPrice)
    }
    //אם מינ גדול ממקס נחזיר הודעה בהתאם
    else if(min>max){
        return res.status.json(401)({msg_err:'cannot find when minimun bigger ther maximun'})
    }
    //נחזיר את המערך המופלטר לפי הקווארי
    filterdCakedByPrice=cakes.filter(cakes=>cakes.price>=min&&cakes.price<=max)
    res.json(filterdCakedByPrice)
    } catch (error) {
         res.status(500).json(err)   
    }
   
})

router.get('/byId/:id',(req,res)=>{
    try {
         //איסוף פארם
    const id=req.params.id;
    //פונקציה פיינד מחזירה אובייקט בודד לפי התנאי
    const cake=cakes.find(cakes=>cakes.id==id)
    //אם הפונקציה לא החזירה כלום ניתן הודעה בהתאם
    if(!cake)
     return res.status.json(401)({msg_err:`Cake not found!`})
     //נחזיר את העוגה לפי האיידי מהפארם
    res.json(cake)
    } catch (error) {
          res.status(500).json(err)   
    }
   
})

router.post('/',(req,res)=>{
    try {
        const {type,price,category}=req.body
        const cake = req.body;
        if(!type,!price,!category)
        return res.json({msg_err:'type,price,category are requierd'})
    
        //פעולה שתוודא שרק הערכים שאני רוצה יהיו בבאדי ולא אחרת
        //לולאה זאת תרוץ על כל מפתח באובייקט 
        for (const key in cake) {
            if(key!='type' && key!='price' && key!='category')
            return res.json({msg_err:'only type,price and category are requierd'})
        }
        //מוסיף שדה אי די כעורך המערך +1 
        cake.id=cakes.length + 1
        //מוסיף את העוגה למערך של העוגות
        cakes.push(cake)
        res.json({msg:'cake add',cake})
    } catch (error) {
        res.status(500).json(err) 
    }
   
})

router.delete('/:id',(req,res)=>{
    try {
        const id =req.params.id
    const cake=cakes.find(cakes=>cakes.id==id)
    if(!cake){
        return res.json({msg_err:'Cake not found'})
    }
    let index;
    cakes.forEach((cake,i)=>{
        if(cake.id==id){
            index=i
        }
    });

    cakes.splice(index,1)
    res.json(cakes)
    } catch (error) {
        res.status(500).json(err) 
    }
    
})

export default router;