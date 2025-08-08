import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TOKEN = 'token';

export const saveToken = (token) => {
    Cookies.set(TOKEN, token);
};

export const getToken = () => {
    return Cookies.get(TOKEN) || null;
};

export const decodeToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Failed to decode token:', error.message);
        return null;
    }
};

export const isAdminLoggedIn = () => {
    const decoded = decodeToken();
    return decoded?.role === 'ADMIN';
};

export const isCustomerLoggedIn = () => {
    const decoded = decodeToken();
    return decoded?.role === 'CUSTOMER';
};

export const removeToken = () => {
    Cookies.remove(TOKEN);
};
