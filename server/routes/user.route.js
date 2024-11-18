import express from 'express';
import { test, signout, updateUser } from '../controllers/user.controller.js';
import { verifyAuthentication } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyAuthentication, updateUser)
router.post('/signout', signout);

export default router;