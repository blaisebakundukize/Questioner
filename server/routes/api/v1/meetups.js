import { Router } from 'express';
import Meetup from '../../../controllers/meetup';
// import auth from '../../../middleware/auth';
// import QuestionController from '../../../controllers/questionController';

const router = Router();

router.get('/', Meetup.getMeetups);
router.get('/upcoming', Meetup.getMeetups);
router.get('/:meetupId', Meetup.getMeetupById);
// router.post('/:meetupId/rsvps', Meetup.replyToAttend);
router.post('/', Meetup.createMeetup);
// router.post('/:meetupId/questions/', QuestionController.createQuestion);
// router.patch('/:meetupId/questions/:questionId/upvote', QuestionController.voteQuestion);
// router.patch('/:meetupId/questions/:questionId/downvote', QuestionController.voteQuestion);
export default router;
