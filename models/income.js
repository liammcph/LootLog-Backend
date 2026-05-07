const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
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

const Income = mongoose.model("Income", incomeSchema)
module.exports = Income