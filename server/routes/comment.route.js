import express from 'express';
import { verifyAuthentication } from '../utils/verifyUser.js';
import { createComment, getPostComments ,likeComment,editComment, deleteComment} from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyAuthentication, createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyAuthentication, likeComment)
router.put('/editcomment/:commentId', verifyAuthentication,editComment)
router.delete('/deletecomment/:commentId', verifyAuthentication,deleteComment)

export default router;