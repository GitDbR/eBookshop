const express = require('express');
const router = express.Router();
const {aunthenticateJWT, authorizeRole} = require('../../middlewares/authMiddleware');
const {fetchOrders } = require('../../controllers/admin/orderController');


router.get('/', aunthenticateJWT, authorizeRole('ADMIN'), fetchOrders);


module.exports = router;