const User = require('../models/user.model');
const Blog = require('../models/blog.model');

const returnAuthUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    res.status(200).json(user);

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log('route GET => /api/me/user', e);
  }
};

/**
 * GET /me/blogs - Return logged user blogs
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
const returnUserBlogs = async (req, res, next) => {
  try {
    const { id } = req.user;
    const blogs = await Blog.find({ user: id });

    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log('route GET => /api/me/blogs', e);
  }
};

module.exports = {
  returnAuthUser,
  returnUserBlogs,
};
