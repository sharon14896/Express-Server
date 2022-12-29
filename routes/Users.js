import express from "express";
import { UserModel } from "../models/userModel.js";

const router = express.Router();


router.get('/',async (req, res) => {
    const users=await UserModel.find({})
    try {
        res.json(users)
    } catch (error) {
        res.status(500).json({msg_err:err})
    }
      
      
})




export default router;