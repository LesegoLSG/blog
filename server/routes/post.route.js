import express from 'express';
import { verifyAuthentication } from '../utils/verifyUser.js';
import { create , getPosts,deletePost, updatePost} from '../controllers/post.controller.js';



const router = express.Router();

router.post('/create', verifyAuthentication, create)
router.get('/getposts', getPosts)
router.delete('/deletepost/:postId/:userId',verifyAuthentication, deletePost)
router.put('/updatepost/:postId/:userId', verifyAuthentication,updatePost)
export default router;