import { Router } from 'express';
import Question from '../../../controllers/question';

const router = Router();

router.post('/', Question.createQuestion);
// router.patch('/downvote', QuestionController.voteQuestion);
export default router;
