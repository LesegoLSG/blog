import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) =>{
    res.json({message:'API is working'});
}

export const updateUser = async (req,res,next) =>{
   if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"Yo don't have the authority to update this user"));
   }
   if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400, "Password must be atleast 6 characters"))
    }
    req.body.passqord = bcryptjs.hashSync(req.body.password, 10);
   }

   try{
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set:{
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              contact: req.body.contact,
              email: req.body.email,
              password: req.body.password, 
              profilePicture: req.body.profilePicture, 
            },
        }, {new:true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
   }catch(error){
            next(error);
   }
}

export const signout = (req,res,next) =>{
    try{
        res.clearCookie('access_token').status(200).json('User signed out successfully');
    }catch(error){
        next(error);
    }
}