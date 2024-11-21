import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";




export const updateUser = async (req,res,next) =>{
    console.log("user.id:", req.user.id);
    console.log("params.userId:", req.params.userId);

   if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"You don't have the authority to update this user"));
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

export const getUsers = async (req,res,next) =>{

    if(!req.user.isAdmin){
        return next(errorHandler(403,"Sorry... You are not authorized to view this page"))
    }
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const users = await User.find()
        .sort({ createdAt: sortDirection}).skip(startIndex).limit(limit); 

        const userWithNoPassword = users.map((user) =>{
            const {password, ...rest} = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const currentDay = new Date();
        const oneMonthAgo = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth() - 1,
            currentDay.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo},
        });

        res.status(200).json({
            users:userWithNoPassword,
            totalUsers,
            lastMonthUsers,
        });


    }catch(error){
        next(error);
    }
}