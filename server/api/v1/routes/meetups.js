import { Router } from 'express';
import MeetupController from '../controllers/meetupController';

const router = Router();

router.get('/', MeetupController.getMeetups);
router.get('/upcoming', MeetupController.getMeetups);

module.exports = router;
