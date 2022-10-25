const Blog = require('../models/blog.model');

/**
 * GET /blogs - Return all blogs
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const returnAll = async (req, res, next) => {
  try {
    const data = await Blog.find();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route GET => /api/blogs`, e);
  }
}

/**
 * GET /blogs/:id - Return blog by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const returnById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Blog.findById(id).populate('user', ['firstname','lastname', 'email']);

    if (!data) {
      return res.status(500).json({
        success: false,
        message: `Can't find blog by ${id}`,
      });
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route GET => /api/blogs/:id`, e);
  }
};

/**
 * POST /blogs - Create blog
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const create = async (req, res, next) => {
  try {
    const {
      title,
      description,
    } = req.body;

    const { id } = req.user;

    const data = await Blog.create({
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

    console.log(`route POST create => /api/blogs`, e);
  }
}

/**
 * DELETE /blogs - Delete blog by ID
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Blog.findByIdAndDelete(id);

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
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log('route DELETE => /api/blogs', e);
  }
}

module.exports = {
  returnAll,
  returnById,
  create,
  deleteById,
};
