const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { bcryptSalt, jwtSecret } = require('../config');

const User = require('../models/user.model');

/**
 * POST /login - Login
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({
        message: `Can't find user by ${email}`,
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({
        message: 'Wrong password or email',
      });
    }

    const accessToken = await jwt.sign({ id: user._id, email: user.email }, jwtSecret);

    res.status(200).json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      accessToken
    });
  } catch (e) {
    console.log('route POST => /api/login', e);
  }
});

/**
 * GET /api/user - Register user
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Callback for middleware
 */
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, bcryptSalt);

    const foundedUser = await User.findOne({ email });
    if (foundedUser) {
      return res.status(409).json({
        success: false,
        message: `User with ${email} already exists`
      });
    }

    const data = await User.create({
      firstname,
      lastname,
      email,
      password: passwordHash,
    });

    const accessToken = await jwt.sign({ id: data._id, email: data.email }, jwtSecret);

    res.status(200).json({
      _id: data._id,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      accessToken
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message ? e.message : e,
    });

    console.log(`route POST => /api/user`, e);
  }
});

module.exports = router;
