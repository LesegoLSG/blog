import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
       return next(errorHandler(400, "All fields are required"));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'Incorrect credentials'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandler(400, 'Incorrect credentials'));
        }

        const token = jwt.sign(
            {id:validUser._id},
            process.env.JWT_SECRET_KEY,
        );

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access-token', token, {
            httpOnly:true
        }).json(rest);
        

    }catch(error){
        next(error);
    }
}