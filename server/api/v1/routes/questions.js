import { Router } from 'express';
import QuestionController from '../controllers/questionController';

const router = Router();

router.post('/', QuestionController.createQuestion);
router.patch('/upvote', QuestionController.voteQuestion);
router.patch('/downvote', QuestionController.voteQuestion);

module.exports = router;
