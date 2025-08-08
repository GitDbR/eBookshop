const express = require('express');
const router = express.Router();
const {aunthenticateJWT, authorizeRole} = require('../../middlewares/authMiddleware');
const { getAllBooks, getBookById, searchBook} = require('../../controllers/customer/bookController');

router.get('/', aunthenticateJWT, authorizeRole('CUSTOMER'), getAllBooks);

router.get('/:id', aunthenticateJWT, authorizeRole('CUSTOMER'), getBookById);

router.get('/search/:genre', aunthenticateJWT, authorizeRole('CUSTOMER'), searchBook);

module.exports = router;