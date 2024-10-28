import { Router } from 'express';
import { createPost, getPostById, getPosts } from '../controllers/postController';
import { authenticateJWT, checkPermissions } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateJWT, checkPermissions('reader'), getPosts);
router.post('/', authenticateJWT, checkPermissions('creator'), createPost);
router.get('/getById', authenticateJWT, checkPermissions('creator'), getPostById);

export default router;
