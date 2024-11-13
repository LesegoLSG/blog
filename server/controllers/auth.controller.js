import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next) =>{
    const {firstName, lastName, contact, email, password} = req.body;

    if(!firstName || !lastName || !contact || !email || !password || firstName === "" || lastName === "" || contact === "" || email === "" || password === "" ){
       next(errorHandler(400,'All fields are required'));
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
        next(error);
    }
   
}