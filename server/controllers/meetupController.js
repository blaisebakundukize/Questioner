import Meetup from '../models/meetup';
import { validateMeetup, validateRSVP } from '../utils/validateData';
import Tag from '../models/tag';
import RSVP from '../models/rsvp';

/**
 * Class is controlling meetup model
 * @exports
 * @class
 */
class MeetupController {
  /**
   * @constructor
   */
  // constructor() {
  // }

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
        meetups = await Meetup.getUpcoming();
      } else {
        meetups = await Meetup.getAll();
      }
      const data = meetups.map((m) => {
        const meetupFound = {
          id: m.id,
          title: m.topic,
          location: m.location,
          happeningOn: m.happeningOn,
          tags: m.tags
        };
        return meetupFound;
      });
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
   * Get a specific meetup record
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  async getMeetupById(req, res) {
    const id = parseInt(req.params.meetupId, 10);
    try {
      const data = await Meetup.getById(id);
      res.status(200).send({
        status: 200,
        data: {
          id: data.id,
          title: data.topic,
          location: data.location,
          happeningOn: data.happeningOn,
          tags: data.tags
        }
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        error: error.message
      });
    }
  }

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
      Tag.createUnfoundTags(tagsName);
      const error = await validateMeetup(data);
      if (error.length > 0) {
        return res.status(400).send({
          status: 400,
          error
        });
      }
      const meetupSaved = await Meetup.create(data);
      return res.status(201).send({
        status: 201,
        data: [{
          topic: meetupSaved.topic,
          location: meetupSaved.location,
          happeningOn: new Date(meetupSaved.happeningOn),
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
   * Reply to attend a meetup
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  async replyToAttend(req, res) {
    const data = req.body;
    data.meetup = parseInt(req.params.meetupId,
      10);
    try {
      const error = await validateRSVP(data);
      if (error.length > 0) {
        return res.status(400).send({
          status: 400,
          error
        });
      }
      const meetup = await Meetup.getById(data.meetup);
      // Check if user has already replied to attend the meetup
      const isUserNotReplied = RSVP.getUserReplyToAttend(data);
      if (isUserNotReplied) {
        const createdData = await RSVP.replyToAttend(data);
        return res.status(201).send({
          status: 201,
          data: [
            {
              meetup: createdData.meetup,
              topic: meetup.topic,
              status: createdData.response
            }
          ]
        });
      }

      const rsvpUpdated = RSVP.updateUserReplyToAttend(data);

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


export default new MeetupController();
