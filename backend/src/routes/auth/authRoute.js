const {login, signup} = require('../../controllers/auth/authController');
const express = require('express');

const router = express.Router();

//define routes for login and signup
router.post('/signup' , signup);

router.post('/login' , login);


module.exports = router;