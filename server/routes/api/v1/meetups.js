import { Router } from 'express';
import Meetup from '../../../controllers/meetup';
import auth from '../../../middleware/auth';
import Question from '../../../controllers/question';

const router = Router();

router.get('/', auth, Meetup.getMeetups);
router.get('/upcoming', auth, Meetup.getMeetups);
router.get('/:meetupId', auth, Meetup.getMeetupById);
router.post('/:meetupId/rsvps', auth, Meetup.replyToAttend);
router.post('/', auth, Meetup.createMeetup);
router.post('/:meetupId/questions/', auth, Question.createQuestion);

export default router;
