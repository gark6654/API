const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

/**
 * GET /api/user - Returns all User
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.get('/', async (req, res) => {
  try {
    console.log(req.user);
    const data = await User.find({});
    res.status(200).json(data);
  } catch (e) {
    console.log(`route GET => /api/user`, e);
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });
  }
});

/**
 * GET /api/user/:id - Returns user by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);

    res.status(200).json(data);
  } catch (e) {
    console.log(`route GET => /api/user/:id`, e);
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });
  }
});

/**
 * GET /api/user/:id - Delete user by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete({ _id: id });

    if (!result) {
      return res.status(500).json({
        success: false,
        message: `Can't find user by ${id}`,
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route DELETE => /api/user`, e);
  }
});

module.exports = router;
