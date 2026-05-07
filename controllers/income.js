const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify-jwt.js')
const Income = require("../models/income.js");


router.post('/', verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id
        if (!req.body.name) {
            throw new Error("Name of Income missing!")
        }
        if (!req.body.amount) {
            throw new Error("Amount of Income missing")
        }
        const income = await Income.create(req.body)
        income._doc.author = req.user
        res.status(201).json(income)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.get('/', verifyToken, async (req, res) => {
    try {
        const income = await Income.find({})
        .populate("author")
        res.status(200).json(income)
    } catch (error) {
    res.status(500).json({ err: error.message })
    }
})

router.get('/:incomeId', verifyToken, async (req, res) => {
    try {
        const income = await Income.findById(req.params.incomeId)
        res.status(200).json(income)
    } catch (error) {
    res.status(500).json({ err: error.message })
    }
})

router.put('/update/:incomeId', verifyToken, async (req, res) => {
    try {
        const income = await Income.findById(req.params.incomeId)
        if (!income.author.equals(req.user._id)) {
            return res.status(403).send("Unauthorized Action")
        } 
        if (!req.body.name) {
            throw new Error("Name of Income missing!")
        }
        if (!req.body.amount) {
            throw new Error("Amount of Income missing")
        }
        const updatedIncome = await Income.findByIdAndUpdate(
            req.params.incomeId,
            req.body,
            { new: true } )
        updatedIncome._doc.author = req.user
        res.status(200).json(updatedIncome)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

router.delete('/delete/:incomeId', verifyToken, async (req, res) => {
    try {
        const income = await Income.findById(req.params.incomeId)
        if (!income.author.equals(req.user._id)) {
            return res.status(403).send("Unauthorized Action")
        }
        const deletedIncome = await Income.findByIdAndDelete(req.params.incomeId)
        res.status(200).json(`Deletion of ${deletedIncome.name} successful`)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

module.exports = router