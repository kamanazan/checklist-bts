const express = require("express");
const { ChecklistItem, Checklist } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getItem/:checklistId/", authMiddleware, async (req, res) => {
    const checklistItem = await ChecklistItem.findAll({ where: { checklistId: req.params.checklistId } });
    res.json(checklistItem);
});

router.post("/add/:checklistId/", authMiddleware, async (req, res) => {
  const { item } = req.body;
  const checklist = await Checklist.findOne({ where: { id: req.params.checklistId, userId: req.user.userId } });

  if (!checklist) return res.status(404).json({ error: "Checklist not found" });

  const checklistItem = await ChecklistItem.create({ item, checklistId: checklist.id });
  res.status(201).json(checklistItem);
});

// Update an item (e.g., mark as completed)
router.put("/:id", authMiddleware, async (req, res) => {
  const { completed } = req.body;
  const checklistItem = await ChecklistItem.findByPk(req.params.id, { include: Checklist });

  if (!checklistItem || checklistItem.Checklist.userId !== req.user.userId) {
    return res.status(404).json({ error: "Item not found" });
  }

  checklistItem.completed = completed;
  await checklistItem.save();
  res.json(checklistItem);
});

// Delete an item
router.delete("/:id", authMiddleware, async (req, res) => {
  const checklistItem = await ChecklistItem.findByPk(req.params.id, { include: Checklist });

  if (!checklistItem || checklistItem.Checklist.userId !== req.user.userId) {
    return res.status(404).json({ error: "Item not found" });
  }

  await checklistItem.destroy();
  res.json({ message: "Item deleted" });
});

module.exports = router;
