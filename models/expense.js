const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    details: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: true,
    })

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;