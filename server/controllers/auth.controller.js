import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req,res) =>{
    const {firstName, lastName, contact, email, password} = req.body;

    if(!firstName || !lastName || !contact || !email || !password || firstName === "" || lastName === "" || contact === "" || email === "" || password === "" ){
        return res.status(400).json({message: "All fields are required."});
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        contact,
        email,
        password:hashedPassword
    });

    try{
        await newUser.save();
        res.json('Sign up successfully');
    }catch(error){
        res.status(500).json({message: error.message});
    }
   
}