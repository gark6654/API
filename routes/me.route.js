const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const Blog = require('../models/blog.model');

/**
 * GET /api/me/blogs - Get logged user blogs
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.get('/blogs', isAuthorized, async (req, res) => {
  try {
    const { id } = req.user;

    const blogs = await Blog.find({ user: id });
    res.status(200).json(blogs);
  } catch (e) {
    console.log('route GET => /api/me/blogs', e);
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });
  }
});

module.exports = router;
