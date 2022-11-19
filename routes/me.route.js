const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const { returnAuthUser, returnUserBlogs } = require('../controllers/me.controller');

router.get('/user', isAuthorized, returnAuthUser);
router.get('/blogs', isAuthorized, returnUserBlogs);

module.exports = router;
