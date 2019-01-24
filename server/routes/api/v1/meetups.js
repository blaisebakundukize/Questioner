import { Router } from 'express';
import Meetup from '../../../controllers/meetup';
import auth from '../../../middleware/auth';
import Question from '../../../controllers/question';

const router = Router();

router.get('/', Meetup.getMeetups);
router.get('/upcoming', Meetup.getMeetups);
router.get('/:meetupId', Meetup.getMeetupById);
router.post('/:meetupId/rsvps', auth, Meetup.replyToAttend);
router.post('/', Meetup.createMeetup);
router.post('/:meetupId/questions/', auth, Question.createQuestion);

export default router;
