import { Router } from 'express';
import User from '../../../controllers/user';

const router = Router();

router.post('/signup', User.create);
router.post('/login', User.login);

export default router;
