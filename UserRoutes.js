import express from "express";

const router=express.Router()


router.get('/',(req,res)=>{
    res.json("user")
})

router.get('/createUser',(req,res)=>{
    res.send("User created");
})

router.get('/editUser',(req,res)=>{
    res.send("User updated");
})

router.get('/deleteUser',(req,res)=>{
    res.send("User deleted");
})

export default router;