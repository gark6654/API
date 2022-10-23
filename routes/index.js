const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).json(
    {
      message: 'Welcome to API home page',
    },
  );
});

module.exports = router;
