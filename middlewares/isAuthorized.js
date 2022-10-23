const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (!accessToken) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }

    const { id } = await jwt.verify(accessToken, jwtSecret);
    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;

    next();
  } catch (e) {
    console.log('isAuthorized middleware => ', e);
    res.status(500).json({
      message: e.message ? e.message : e,
    });
  }
}
