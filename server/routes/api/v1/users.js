import { Router } from 'express';
import User from '../../../controllers/user';

const router = Router();

router.post('/', User.create);

export default router;
