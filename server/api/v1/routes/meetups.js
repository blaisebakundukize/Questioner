import { Router } from 'express';
import MeetupController from '../controllers/meetupController';

const router = Router();

router.get('/', MeetupController.getMeetups);
router.get('/upcoming', MeetupController.getMeetups);
router.get('/:meetupId', MeetupController.getMeetupById);
router.post('/:meetupId/rsvps', MeetupController.replyToAttend);
router.post('/', MeetupController.createMeetup);

module.exports = router;
