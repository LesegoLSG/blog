import express from 'express';
import { verifyAuthentication } from '../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';


const router = express.Router();

router.post('/create', verifyAuthentication, create)

export default router;