const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const { returnUserBlogs } = require('../controllers/me.controller');

router.get('/blogs', isAuthorized, returnUserBlogs);

module.exports = router;
