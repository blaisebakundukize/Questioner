import meetup from '../models/meetup';
import { validateMeetup, validateRSVP } from '../utils/validateData';
import Tag from '../models/tag';
import RSVP from '../models/rsvp';

/**
 * Class is controlling meetup model
 * @exports
 * @class
 */
class Meetup {
  /**
   * Create a meetup
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  async createMeetup(req, res) {
    const data = req.body;
    const tagsName = data.tags;
    try {
      const error = await validateMeetup(data);
      if (error.length > 0) {
        return res.status(400).send({
          status: 400,
          error
        });
      }
      await meetup.getByPropertyValues(data);
      const tagsId = await Tag.createUnfoundTags(tagsName);
      const meetupSaved = await meetup.create(data);
      await Tag.meetupHasTags(tagsId, meetupSaved.meetup_id);
      return res.status(201).send({
        status: 201,
        data: [{
          id: meetupSaved.meetup_id,
          topic: meetupSaved.topic,
          description: meetupSaved.description,
          location: meetupSaved.location,
          happeningOn: meetupSaved.happening_on,
          tags: tagsName
        }]
      });
    } catch (e) {
      return res.status(400).send({
        status: 400,
        error: e.message
      });
    }
  }

  /**
   * Retrieve all meetups
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  async getMeetups(req, res) {
    const path = req.path.toLowerCase().split('/').find(p => p === 'upcoming');
    try {
      let meetups = [];
      if (typeof path !== 'undefined') {
        meetups = await meetup.getUpcoming();
      } else {
        meetups = await meetup.getAll();
      }
      res.status(200).send({
        status: 200,
        data: meetups
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        error: error.message
      });
    }
  }

  /**
 * Get a specific meetup record
 * @param {Object} req - request made by the user
 * @param {Object} res - response to be given to the user
 * @return {Object} Response
 */
  async getMeetupById(req, res) {
    const id = parseInt(req.params.meetupId, 10);
    try {
      const data = await meetup.getById(id);
      res.status(200).send({
        status: 200,
        data
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        error: error.message
      });
    }
  }

  /**
   * Reply to attend a meetup
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  async replyToAttend(req, res) {
    const data = req.body;
    data.meetup = parseInt(req.params.meetupId,
      10);
    data.user = req.user.userId;
    console.log(data);
    try {
      const error = await validateRSVP(data);
      if (error.length > 0) {
        return res.status(400).send({
          status: 400,
          error
        });
      }
      const meetupRetrieved = await meetup.getById(data.meetup);
      // console.log(meetupRetrieved);
      // Check if user has already replied to attend the meetup
      const isUserNotReplied = await RSVP.getUserReplyToAttend(data);
      // console.log(isUserNotReplied);
      if (isUserNotReplied) {
        const createdData = await RSVP.replyToAttend(data);
        return res.status(201).send({
          status: 201,
          data: [
            {
              meetup: createdData.meetup,
              topic: meetupRetrieved.topic,
              status: createdData.response
            }
          ]
        });
      }

      const rsvpUpdated = await RSVP.updateUserReplyToAttend(data);

      return res.status(201).send({
        status: 201,
        data: [
          {
            meetup: rsvpUpdated.meetup,
            topic: meetup.topic,
            status: rsvpUpdated.response
          }
        ]
      });
    } catch (e) {
      return res.status(400).send({
        status: 400,
        error: e.message
      });
    }
  }
}

export default new Meetup();
