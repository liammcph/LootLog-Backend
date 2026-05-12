const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify-jwt.js');
const Expense = require("../models/expense.js");

router.post('/', verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id;
        if (!req.body.name) {
            throw new Error("Name of Expense missing!");
        }
        if (!req.body.amount) {
            throw new Error("Amount of Expense missing");
        }
        const expense = await Expense.create(req.body);
        expense._doc.author = req.user;
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

router.get('/', verifyToken, async (req, res) => {
    try {
        const expense = await Expense.find({})
            .populate("author");
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

router.get('/:expenseId', verifyToken, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.expenseId);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

router.put('/:expenseId', verifyToken, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.expenseId);
        if (!expense.author.equals(req.user._id)) {
            return res.status(403).send("Unauthorized Action");
        }
        if (!req.body.name) {
            throw new Error("Name of Expense missing!");
        }
        if (!req.body.amount) {
            throw new Error("Amount of Expense missing");
        }
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.expenseId,
            req.body,
            { new: true });
        updatedExpense._doc.author = req.user;
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

router.delete('/:expenseId', verifyToken, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.expenseId);
        if (!expense.author.equals(req.user._id)) {
            return res.status(403).send("Unauthorized Action");
        }
        const deletedExpense = await Expense.findByIdAndDelete(req.params.expenseId);
        res.status(200).json(deletedExpense);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

module.exports = router;