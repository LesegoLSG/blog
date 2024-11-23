import express from 'express';
import { verifyAuthentication } from '../utils/verifyUser.js';
import { createComment, getPostComments ,likeComment} from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyAuthentication, createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyAuthentication, likeComment)

export default router;