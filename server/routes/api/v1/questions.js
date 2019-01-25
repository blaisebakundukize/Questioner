import { Router } from 'express';
import Question from '../../../controllers/question';
import auth from '../../../middleware/auth';

const router = Router();

router.patch('/:questionId/upvote', auth, Question.voteQuestion);
router.patch('/:questionId/downvote', auth, Question.voteQuestion);
router.post('/:questionId/comments', auth, Question.createComment);

export default router;
