const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    savedAmount: {
      type: Number,
      default: 0,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
