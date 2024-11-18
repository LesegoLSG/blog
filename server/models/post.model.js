import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
            unique:true,
        },
        image:{
            type:String,
            default:'https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg?semt=ais_hybrid'
        },
        category:{
            type:String,
            default:"uncategorized",
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },
    },{timestamps:true}
);

const Post = mongoose.model('Post', postSchema);

export default Post;