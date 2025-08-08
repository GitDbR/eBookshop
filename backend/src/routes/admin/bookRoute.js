const express = require('express');
const router = express.Router();
const {aunthenticateJWT, authorizeRole} = require('../../middlewares/authMiddleware');
const {createBook, getAllBooks, getBookById, deleteBook, updateBook, searchBook} = require('../../controllers/admin/bookController');

router.post('/', aunthenticateJWT, authorizeRole('ADMIN'), createBook);

router.get('/', aunthenticateJWT, authorizeRole('ADMIN'), getAllBooks);

router.get('/:id', aunthenticateJWT, authorizeRole('ADMIN'), getBookById);

router.delete('/:id', aunthenticateJWT, authorizeRole('ADMIN'), deleteBook);

router.put('/:id', aunthenticateJWT, authorizeRole('ADMIN'), updateBook);

router.get('/search/:genre', aunthenticateJWT, authorizeRole('ADMIN'), searchBook);

module.exports = router;