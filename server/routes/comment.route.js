import express from 'express';
import { verifyAuthentication } from '../utils/verifyUser.js';
import { createComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyAuthentication, createComment);

export default router;