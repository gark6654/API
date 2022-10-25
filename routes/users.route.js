const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const {
  returnAll,
  returnById,
  deleteById,
} = require('../controllers/users.controller');

router.get('/', returnAll);

router.get('/:id', returnById);

router.delete('/:id', isAuthorized, deleteById,);

module.exports = router;
