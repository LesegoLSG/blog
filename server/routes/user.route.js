import express from 'express';
import { signout, updateUser,getUsers,deleteUser } from '../controllers/user.controller.js';
import { verifyAuthentication } from '../utils/verifyUser.js';


const router = express.Router();


router.put('/update/:userId',verifyAuthentication, updateUser)
router.post('/signout', signout);
router.get('/getusers',verifyAuthentication, getUsers)
router.delete('/delete/:userId',verifyAuthentication, deleteUser);

export default router;