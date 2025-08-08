const express = require('express');
const router = express.Router();
const {aunthenticateJWT, authorizeRole} = require('../../middlewares/authMiddleware');
const { placeOrder, fetchOrdersByUser} = require('../../controllers/customer/orderController');

router.post('/', aunthenticateJWT, authorizeRole('CUSTOMER'), placeOrder);

router.get('/', aunthenticateJWT, authorizeRole('CUSTOMER'), fetchOrdersByUser);


module.exports = router;