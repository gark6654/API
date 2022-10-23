const express = require('express');
const router = express.Router();
const blogs = require('../models/blog.model');
const isAuthorized = require('../middlewares/isAuthorized');

/**
 * GET /api/blogs - Returns all blogs
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.get('/', async (req, res) => {
  try {
    const data = await blogs.find();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route GET => /api/blogs`, e);
  }
});

/**
 * GET /api/blogs - Return blog by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogs.findById(id).populate('author');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route GET => /api/blogs/:id`, e);
  }
});

/**
 * GET /api/blogs - Add single blog
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.post('/', isAuthorized, async (req, res) => {
  try {
    const {
      title,
      description,
    } = req.body;

    const { id } = req.user;

    const data = await blogs.create({
      title,
      description,
      user: id,
    });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route POST => /api/blogs`, e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogs.findByIdAndDelete(id);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: `Can't find blog by ${id}`,
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log('route DELETE => /api/blogs', e);

    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });
  }
});

module.exports = router;
