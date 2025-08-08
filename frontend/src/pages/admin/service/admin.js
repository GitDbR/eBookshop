import instance from "../../../environment/axiosInstance";

export const postBook = async (bookDto) => {
    try {
        const response = await instance.post(`/api/admin/book`, bookDto);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await instance.delete(`/api/admin/book/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBooks  = async (id) => {
    try {
        const response = await instance.get(`/api/admin/book`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBookById = async (id) => {
    try {
        const response = await instance.get(`/api/admin/book/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (id, bookDto) => {
    try {
        const response = await instance.put(`/api/admin/book/${id}`, bookDto);
        return response;
    } catch (error) {
        throw error;
    }
};

export const searchBook = async (genre) => {
    try{
        const response = await instance.get(`/api/admin/book/search/${genre}`);
        return response;
    }catch(error){
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await instance.get(`/api/admin/order`);
        return response;
    } catch (error) {
        throw error;
    }
};