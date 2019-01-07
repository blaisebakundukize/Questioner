import { Router } from 'express';
import QuestionController from '../controllers/questionController';

const router = Router();

router.post('/', QuestionController.createQuestion);

module.exports = router;
