import instance from "../../../environment/axiosInstance";

export const getBooks  = async (id) => {
    try {
        const response = await instance.get(`/api/customer/book`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const searchBook = async (genre) => {
    try{
        const response = await instance.get(`/api/customer/book/search/${genre}`);
        return response;
    }catch(error){
        throw error;
    }
};

export const addBookToCart = async (bookId) => {
    try{
        const response = await instance.post(`/api/customer/cart/${bookId}`);
        return response;
    }catch(error){
        throw error;
    }
};  

export const getCartByUser = async () => {
    try {
        const response = await instance.get(`/api/customer/cart`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const placeOrder = async (data) => {
    try {
        const response = await instance.post(`/api/customer/order`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getMyOrders = async () => {
    try {
        const response = await instance.get(`/api/customer/order`);
        return response;
    } catch (error) {
        throw error;
    }
};