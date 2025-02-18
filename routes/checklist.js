const express = require("express");
const { Checklist, ChecklistItem } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all checklists for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const checklists = await Checklist.findAll({ where: { userId: req.user.userId } });
  res.json(checklists);
});


// Create a new checklist
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const checklist = await Checklist.create({ title, userId: req.user.userId });
  res.status(201).json(checklist);
});

// Get a single checklist with its items
router.get("/:id", authMiddleware, async (req, res) => {
  const checklist = await Checklist.findOne({
    where: { id: req.params.id, userId: req.user.userId },
    include: [{ model: ChecklistItem }],
  });
  if (!checklist) return res.status(404).json({ error: "Checklist not found" });
  res.json(checklist);
});

// Update checklist title
router.put("/:id", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const checklist = await Checklist.findOne({ where: { id: req.params.id, userId: req.user.userId } });
  if (!checklist) return res.status(404).json({ error: "Checklist not found" });

  checklist.title = title;
  await checklist.save();
  res.json(checklist);
});

// Delete checklist (cascade delete items)
router.delete("/:id", authMiddleware, async (req, res) => {
  const checklist = await Checklist.findOne({ where: { id: req.params.id, userId: req.user.userId } });
  if (!checklist) return res.status(404).json({ error: "Checklist not found" });

  await checklist.destroy();
  res.json({ message: "Checklist deleted" });
});

module.exports = router;
