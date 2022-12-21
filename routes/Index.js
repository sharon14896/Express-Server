import express from "express";

const router=express.Router()

//מרספונס משתמשים להחזרת של התשובה 
//ראוט שמחזיר טקסט 
router.get('/',(req,res)=>{
    res.json({msg:"Server is up"})
})


export default router;