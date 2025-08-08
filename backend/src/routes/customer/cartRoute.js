const express = require('express');
const router = express.Router();
const {aunthenticateJWT, authorizeRole} = require('../../middlewares/authMiddleware');
const { postBookToCart, getCartByUser} = require('../../controllers/customer/cartController');

router.post('/:bookId', aunthenticateJWT, authorizeRole('CUSTOMER'), postBookToCart);

router.get('/', aunthenticateJWT, authorizeRole('CUSTOMER'), getCartByUser);



module.exports = router;