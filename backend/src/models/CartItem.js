const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartItemSchema = new Schema({
    price:{
        type: Number,
    },

    quantity:{
        type: Number,
    },

    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },

    order:{
        type: Schema.Types.ObjectId,
        ref:'Order',
        default: null
    },
}, {timestamps : true}); //Automatically adds createdAt and updatedAt fields to each user

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;