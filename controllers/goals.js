const router = require('express').Router();
const Goal = require('../models/goal.js');

// POST /goals
router.post('/', async (req, res) => {
  try {
    req.body.author = req.user._id;
    const goal = await Goal.create(req.body);
    goal._doc.author = req.user;
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET /goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({ author: req.user._id })
      .populate('author')
      .sort({ createdAt: 'desc' });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET /goals/:goalId
router.get('/:goalId', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId).populate('author');
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PUT /goals/:goalId
router.put('/:goalId', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);

    if (!goal.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      req.body,
      { new: true }
    );

    updatedGoal._doc.author = req.user;

    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE /goals/:goalId
router.delete('/:goalId', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);

    if (!goal.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedGoal = await Goal.findByIdAndDelete(req.params.goalId);
    res.status(200).json(deletedGoal);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
