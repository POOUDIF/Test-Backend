// routes
const express = require('express');
const router = express.Router();
const { getAllMembers, getMemberBooks } = require('../controllers/memberController');


router.get('/', getAllMembers);

router.get('/:code/books', getMemberBooks);

module.exports = router;
