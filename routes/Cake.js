import express from "express";
import { CakeModel } from "../models/cakeModel.js";
import { addCakeValid } from "../validations/CakeValidation.js";

const router=express.Router()

router.get('/',async (req,res)=>{
    const cakes=await CakeModel.find({})
    try {
        res.json(cakes)
    } catch (error) {
        res.status(500).json({msg_err:err})
    }
      
      
})

router.delete('/byName/:name',async(req,res)=>{
    const type= req.params.type
    const data =await CakeModel.deleteOne({type:type})
    if(!cake){
        return res.status(401).json({msg_err:'Cake not exist'})
    }
    if(data.deletedCount !==1){
    res.status(500).json({msg: 'Caked not deleted'})
    }
    res.status(200).json({msg: 'Cake deleted successfuly'})
    try {
        res.json({msg:req.params.name})
    } catch (error) {
        res.status(500).json({msg_err:err})
    }

})

router.post ('/',async (req,res)=>{
try {
    const cake=req.body
    const validation =addCakeValid(cake)
    if(validation.error){
    return res.status(400).json({msg_err:validation.error.details})
}
    // const data=await CakeModel.create(cake)
    // data.save()
    const cakeData=new CakeModel(cake)
    cakeData.save()
    
} catch (error) {
    if(err.code==11000){
    return res.status(500).json({msg_err:'Cake name is alredy exist'})
    }
    res.status(500).json({msg_err:err})
}

})

export default router;