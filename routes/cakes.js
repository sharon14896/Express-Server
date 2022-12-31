import express from "express";
import { CakeModel } from "../models/cakeModel.js";
import { addCakeValid, updateCakeValid } from "../validations/cakeValidation.js";

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const cakes = await CakeModel.find({})
        res.json(cakes);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg_err: err })
    }
})

router.delete('/byName/:name', async(req, res) => {
    try {
        const name = req.params.name

        const cake = await CakeModel.findOne({ type: name })
        console.log(cake)
        if (!cake) {
            return res.status(401).json({ msg_err: "Cake not exist!" })
        }

        const data = await CakeModel.deleteOne({ type: name })
        if (data.deletedCount != 1) {
            return res.status(500).json({ msg: 'Cake not deleted' })
        }

        return res.status(200).json({ msg: 'Cake deleted successfully' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg_err: err })
    }

})

router.post('/', async(req, res) => {
    try {
        const cake = req.body
        const validation = addCakeValid(cake)
        if (validation.error) {
            return res.status(400).json({ msg_err: validation.error.details })
        }

        // const data = await CakeModel.create(cake)
        // data.save()

        const cakeData = new CakeModel(cake)
        await cakeData.save()

        res.json({ msg: 'Cake Added', cakeData })
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg_err: 'Cake name already exist!' })
        }
        console.log(err)
        res.status(500).json({ msg_err: err })
    }
})

router.put('/byName/:name', async(req, res) => {

    try {
        const name = req.params.name
            // const isExist = await CakeModel.findOne({ type: name })

        // if (!isExist) {
        //     return res.status(401).json({ msg_err: "Cake not exist!" })
        // }

        const cake = req.body
        const validation = updateCakeValid(cake)
        if (validation.error) {
            return res.status(400).json({ msg_err: validation.error.details })
        }
        const data = await CakeModel.updateOne({ type: name }, cake)
        if (data.matchedCount != 1) {
            return res.status(401).json({ msg_err: "Cake not exist!" })
        }
        if (data.modifiedCount == 1 && data.matchedCount == 1) {
            return res.status(200).json({ msg: 'Cake updated successfully' })
        }

        return res.status(200).json({ msg: 'Cake without any updated..' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg_err: err })
    }
})


router.get('/:name', async(req, res) => {
    try {
        const cake = await CakeModel.findOne({ type: req.params.name })

        if (!cake) {
            return res.status(401).json({ msg_err: "Cake not exist!" })
        }

        res.json(cake)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg_err: err })
    }
})
export default router;