import Meetup from '../../../models/meetup';
import { validateMeetup, validateTag } from '../../../utils/validateData';
import Tag from '../../../models/tags';
// import RSVP from '../../../models/rsvp';

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
      // const data = meetups.map(this.addTagByNames);
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
      const data = await Meetup.getById(id);
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
   * Create a meetup
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  async createMeetup(req, res) {
    const data = req.body;
    const tagsName = data.tags;
    try {
      const validated = await validateTag(tagsName);
      Tag.createUnfoundTags(tagsName);
      const isDataValidated = await validateMeetup(data);
      if (isDataValidated && validated) {
        const meetupSaved = await Meetup.create(data);
        res.status(201).send({
          status: 201,
          data: [{
            topic: meetupSaved.topic,
            location: meetupSaved.location,
            happeningOn: new Date(meetupSaved.happeningOn),
            tags: tagsName
          }]
        });
      }
    } catch (e) {
      res.status(400).send({
        status: 400,
        error: e.message
      });
    }
  }

  /**
   * @param {Object} meetup - Contains data for a meetup
   * @returns {Object} meetupDataSelected - Not all meetup data and tags are by their names
   */
  addTagByNames(meetup) {
    // const tags = Tag.getTags(meetup.tags);
    const meetupFound = {
      id: meetup.id,
      title: meetup.topic,
      location: meetup.location,
      happeningOn: meetup.happeningOn,
      tags: meetup.tags // tags.map(tag => tag.name)
    };
    return meetupFound;
  }

  /**
   * Reply to attend a meetup
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  // async replyToAttend(req, res) {
  //   const data = req.body;
  //   data.meetup = parseInt(req.params.meetupId,
  //     10);
  //   const meetup = Meetup.getById(data.meetup);
  //   // Check if user has already replied to attend the meetup
  //   const isUserNotReplied = RSVP.getUserReplyToAttend(data.user, data.meetup);

  //   if (isUserNotReplied) {
  //     try {
  //       const createdData = await RSVP.replyToAttend(data);
  //       res.status(201).send({
  //         status: 201,
  //         data: [
  //           {
  //             meetup: createdData.meetup,
  //             topic: meetup.topic,
  //             status: createdData.response
  //           }
  //         ]
  //       });
  //     } catch (e) {
  //       res.status(400).send({
  //         status: 400,
  //         error: e.message
  //       });
  //     }
  //   } else {
  //     const rsvpUpdated = RSVP.updateUserReplyToAttend(data);
  //     if (rsvpUpdated !== undefined) {
  //       res.status(201).send({
  //         status: 201,
  //         data: [
  //           {
  //             meetup: rsvpUpdated.meetup,
  //             topic: meetup.topic,
  //             status: rsvpUpdated.response
  //           }
  //         ]
  //       });
  //     }
  //   }
  // }
}

export default new MeetupController();
