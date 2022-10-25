const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const {
  returnAll,
  returnById,
  create,
  deleteById,
} = require('../controllers/blogs.controller');

router.get('/', returnAll);
router.get('/:id', returnById);
router.post('/', isAuthorized, create);
router.delete('/:id', deleteById);

module.exports = router;
