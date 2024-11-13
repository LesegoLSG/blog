import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
   process.env.MONGO
).then(() => {console.log('Database is connected')}
).catch((err) =>{
    console.log("Bad credentials", err);
})

const app = express();

app.listen(8000, () =>{
    console.log('server is running on port 8000 happy');
})