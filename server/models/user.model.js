import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
} ,{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

export default User;