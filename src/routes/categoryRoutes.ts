import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController';
import { authenticateJWT, checkPermissions } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, checkPermissions('admin'), createCategory);
router.get('/', authenticateJWT, checkPermissions('admin'), getCategories);

export default router;
