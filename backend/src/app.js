const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { createAdminAccount } = require('./utils/common');
const authRoute = require('./routes/auth/authRoute');
const cors = require('cors');
const adminBookRoute = require('./routes/admin/bookRoute'); 
const adminOrderRoute = require('./routes/admin/orderRoute');  
const customerBookRoute = require('./routes/customer/bookRoute');
const customerCartRoute = require('./routes/customer/cartRoute');
const customerOrderRoute = require('./routes/customer/orderRoute');




const app = express(); //passes incoming http requests with json payloads
app.use(express.json()); //for JSON body parsing
app.use(express.urlencoded({extended: true})); //passes incoming http requests with url encoded payloads eg. form submissions

const corsorigin = process.env.CORS_ORIGIN;

const corsOptions = {
    origin: corsorigin,
    optionsSuccessStatus:200
};

app.use(cors(corsOptions));

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {})
    .then(() => {
        console.log('Connected to MongoDB...');
        createAdminAccount();
    })
    .catch(error => console.error(`MongoDB connection error: ${error}`));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use('/api/auth', authRoute);

//Admin routes
app.use('/api/admin/book', adminBookRoute);
app.use('/api/admin/order', adminOrderRoute)

//Customer routes
app.use('/api/customer/book', customerBookRoute);
app.use('/api/customer/cart',customerCartRoute);
app.use('/api/customer/order',customerOrderRoute);