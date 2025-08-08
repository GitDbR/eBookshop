const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({

    orderDescription:{
        type: String,
    },

    amount:{
        type: Number,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    orderStatus:{
        type: String,
        enum: ['PENDING', 'PLACED'],
        required: true
    },

    trackingId:{
        type: String,
        default: () => require('uuid').v4()
    },

    user:{
        type: Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },

    cartItem:[{
        type: Schema.Types.ObjectId,
        ref:'CartItem',
    }],
}, {timestamps : true}); //Automatically adds createdAt and updatedAt fields to each user

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;