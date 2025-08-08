const bcrypt = require('bcryptjs');
const User = require('../models/Users.js');
require('dotenv').config();

const createAdminAccount = async() =>{
    try{
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const firstName = process.env.ADMIN_FIRST_NAME;
        const lastName = process.env.ADMIN_LAST_NAME;
        const exsistingAdmin = await User.findOne({email:email})

        if(exsistingAdmin) {
            console.log(`Admin account already exsist!`);
            return;
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            email:email, 
            firstName:firstName, 
            lastName:lastName, 
            role:'ADMIN', 
            password:hashedPassword
        });
        await admin.save();
        console.log(`Admin account created successfilly!`)


    }catch(error){
        console.log(`Error creating adminaccount: ${error}`);
    }
};

module.exports = {createAdminAccount};