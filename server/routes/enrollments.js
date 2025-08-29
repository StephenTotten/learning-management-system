const express = require('express');
const { Enrollment, Course } = require('../models');
const router = express.Router();

// Enroll in a course
router.post('/', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId }
    });
    
    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }
    
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress: 0,
      completed: false
    });
    
    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's enrollments
router.get('/user/:userId', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.params.userId },
      include: [Course]
    });
    
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;