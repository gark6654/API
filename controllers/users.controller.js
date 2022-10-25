const User = require('../models/user.model');

/**
 * GET /user - Return all users
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const returnAll = async (req, res, next) => {
  try {
    const data = await User.find({});

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });
    console.log(`route GET => /api/user`, e);
  }
};

/**
 * GET /user - Return user by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const returnById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });
    console.log(`route GET => /api/user/:id`, e);
  }
};

/**
 * DELETE /user/:id - Return user by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const deleteById = async (req, res, next) => {
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
};

module.exports = {
  returnAll,
  returnById,
  deleteById,
};
