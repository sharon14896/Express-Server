import express from "express";
import { UserModel } from "../models/userModel.js";
import { addUserValid, updateUserValid } from "../validations/UserValidation.js";

const router = express.Router();
router.get('/', async(req, res) => {//הצגת כל המשתמשים 
    try {
        const users = await UserModel.find({})
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg_err: err
        });

    }
})

router.post ('/',async (req,res)=>{//הוספת משתמש
    try {
        const user=req.body
        const validation =addUserValid(user)
        if(validation.error){
        return res.status(400).json({msg_err:validation.error.details})
    }
         const data=await UserModel.create(user)
         data.save()
        res.json({msg:"Add"})
    } catch (error) {
        if(err.code== 11000){
        return res.status(500).json({msg_err:'Name is alredy exist'})
        }
        res.status(500).json({msg_err:err})
    }
    })


    router.put('/byName/:name', async(req, res) => {//עדכון משתמש לפי שם

        try {
            const name = req.params.name
            const user = req.body
            const validation = updateUserValid(user)
            if (validation.error) {
                return res.status(400).json({ msg_err: validation.error.details })
            }
            const data = await UserModel.updateOne({ name: name }, user)
            console.log(data);
            if (data.matchedCount != 1) {
                return res.status(401).json({ msg_err: "user not exist!" })
            }
            if (data.modifiedCount == 1 && data.matchedCount == 1) {
                return res.status(200).json({ msg: 'user updated successfully' })
            }
    
            return res.status(200).json({ msg: 'user without any updated..' })
    
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg_err: err })
        }
    })


    router.delete('/byName/:name', async(req, res) => {//מחיקת משתמש לפי שם
        try {
            const name = req.params.name
    
            const user = await UserModel.findOne({ name: name })
            if (!user) {
                return res.status(401).json({ msg_err: "user not exist!" })
            }
            const data = await UserModel.deleteOne({ name: name })
            if (data.deletedCount != 1) {
                return res.status(500).json({ msg: 'user not deleted' })
            }
    
            return res.status(200).json({ msg: 'user deleted successfully' })
    
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg_err: err })
        }
    })

    router.get('/:name', async(req, res) => {//הצגת משתמש לפי שם
        try {
            const user = await UserModel.findOne({ name: req.params.name })
            if (!user) {
                return res.status(401).json({ msg_err: "user not exist!" })
            }
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg_err: err })
        }
    })



export default router;