const Book = require('../../models/Book');
const Order = require('../../models/Order');
const User = require('../../models/Users');
const CartItem = require('../../models/CartItem');

const addBookToCart = async (userId, bookId) =>{
    const activeOrder = await Order.findOne({user: userId, orderStatus: 'PENDING'}).populate('cartItem');
    if(!activeOrder) return {status: 404, data: 'Activeorder not found'};

    if(activeOrder.cartItem.some(item => item.book.toString() === bookId))
        return {status: 409, data: 'Book already exist in cart' };

        const [book, user] = await Promise.all([
            Book.findById(bookId),
            User.findById(userId)
        ]);

        if (!book || !user) return {status: 404, data: 'Book or User not found'};

        const savedCartItem = await new CartItem({
            order: activeOrder,
            user,
            book,
            price: book.price,
            quantity: 1
        }).save();

        activeOrder.amount += book.price;
        activeOrder.cartItem.push(savedCartItem);

        await activeOrder.save();

        return { status:201, data: 'Book added to cart successfully'};
};

const fetchCartUser = async (userId) =>{
    const activeOrder = await Order.findOne({user: userId, orderStatus: 'PENDING'})
        .populate({
            path:'cartItem',
            populate: { path: 'book'}
        });

    if(!activeOrder) return {status: 404, data: 'Active order not found'};

    return { status:200, data: activeOrder};
};

module.exports = { addBookToCart, fetchCartUser }