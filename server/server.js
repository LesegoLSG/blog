import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();

mongoose.connect(
   process.env.MONGO
).then(() => {console.log('Database is connected')}
).catch((err) =>{
    console.log("Bad credentials", err);
})

const app = express();

app.use(express.json());

app.listen(8000, () =>{
    console.log('server is running on port 8000 happy');
});

//Test
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});