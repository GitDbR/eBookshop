const {createUser, loginUser} = require("../../services/auth/authService")

const signup = async(req, res) =>{
    try{
        await createUser(req.body);
        res.status(201).json({message: "Signup Successful"});
    }catch(error){
        if (error.message === 'User already exists!') {
            return res.status(409).json({ error: error.message });
        }
        res.status(400).json({error: error.message})
    }
}

const login = async(req, res) =>{
    try{
        const token = await loginUser(req.body);
        res.status(200).json({message: "Login successful", token});
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup,login}