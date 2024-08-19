const express = require('express');
const router = express.Router();
const Notice = require('../models/notices');

// Route to handle posting a notice
router.post('/notice', async (req, res) => {
  try {
    const { notice } = req.body;
    // Create a new notice instance
    const newNotice = new Notice({ notice });
    // Save the notice to the database
    await newNotice.save();
    res.json({ success: true, message: 'Notice added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add notice' });
  }
});

// Route to fetch all notices
router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a notice by ID
router.delete('/notice/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the notice by ID and delete it
    await Notice.findByIdAndDelete(id);
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete notice' });
  }
});

module.exports = router;
