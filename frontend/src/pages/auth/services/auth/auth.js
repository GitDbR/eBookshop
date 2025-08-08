import instance from '../../../../environment/axiosInstance';

export const signup = async(signupDto) => {
    try{
        const response = await instance.post('api/auth/signup', signupDto);
        return response;
    }catch(error){
        console.log(`Error signing in: `, error.message);
        throw error;
    }
}

export const signin = async(signinDto) => {
    try{
        const response = await instance.post('api/auth/login', signinDto);
        return response;
    }catch(error){
        console.log(`Error logging in: `, error.message);
        throw error;
    }
}