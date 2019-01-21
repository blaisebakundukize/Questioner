import { Router } from 'express';
import MeetupController from '../../../controllers/meetupController';
import QuestionController from '../../../controllers/questionController';

const router = Router();

router.get('/', MeetupController.getMeetups);
router.get('/upcoming', MeetupController.getMeetups);
router.get('/:meetupId', MeetupController.getMeetupById);
router.post('/:meetupId/rsvps', MeetupController.replyToAttend);
router.post('/', MeetupController.createMeetup);
router.post('/:meetupId/questions/', QuestionController.createQuestion);
router.patch('/:meetupId/questions/:questionId/upvote', QuestionController.voteQuestion);
router.patch('/:meetupId/questions/:questionId/downvote', QuestionController.voteQuestion);
export default router;
