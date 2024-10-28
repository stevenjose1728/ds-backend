import { Router } from 'express';
import { authenticateJWT, checkPermissions } from '../middleware/authMiddleware';
import { createContent, getContents } from '../controllers/contentController';

const router = Router();

router.post('/', authenticateJWT, checkPermissions('creator'), createContent);
router.get('/', authenticateJWT, checkPermissions('creator'), getContents);

export default router;
