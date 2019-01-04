import Meetup from '../../../models/meetup';
import Tag from '../../../models/tag';
import RSVP from '../../../models/rsvp';

/**
 * Class is controlling meetup model
 * @exports
 * @class
 */
class MeetupController {
  /**
   * Retrieve all meetups
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  static getMeetups(req, res) {
    const path = req.path.toLowerCase().split('/').find(p => p === 'upcoming');
    let meetups = [];
    if (typeof path !== 'undefined') {
      meetups = Meetup.getUpcoming();
    } else {
      meetups = Meetup.getAll();
    }
    const data = meetups.map(MeetupController.addTagByNames);
    res.status(200).send({
      status: 200,
      data
    });
  }

  /**
   * Get a specific meetup record
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  static getMeetupById(req, res) {
    const id = parseInt(req.params.meetupId, 10);
    const data = Meetup.getById(id);
    if (typeof data !== 'undefined') {
      res.status(200).send({
        status: 200,
        data
      });
    } else {
      res.status(404).send({
        status: 404,
        error: 'Requested meetup is not exist'
      });
    }
  }

  /**
   * @param {Object} meetup - Contains data for a meetup
   * @returns {Object} meetupDataSelected - Not all meetup data and tags are by their names
   */
  static addTagByNames(meetup) {
    const tags = Tag.getTags(meetup.tags);
    const meetupFound = {
      id: meetup.id,
      title: meetup.topic,
      location: meetup.location,
      happeningOn: meetup.happeningOn,
      tags: tags.map(tag => tag.name)
    };
    return meetupFound;
  }

  /**
   * Reply to attend a meetup
   * @param {Object} req - request made by the user
   * @param {Object} res - response to be given to the user
   * @return {Object} Response
   */
  static replyToAttend(req, res) {
    const data = req.body;
    data.meetup = parseInt(req.params.meetupId,
      10);
    const meetup = Meetup.getById(data.meetup);
    // Check if user has already replied to attend the meetup
    const isUserNotReplied = RSVP.getUserReplyToAttend(data.user, data.meetup);

    if (isUserNotReplied) {
      try {
        const createdData = RSVP.replyToAttend(data);
        res.status(201).send({
          status: 201,
          data: [
            {
              meetup: createdData.meetup,
              topic: meetup.topic,
              status: createdData.response
            }
          ]
        });
      } catch (e) {
        res.status(400).send({
          status: 400,
          error: e.message
        });
      }
    } else {
      const rsvpUpdated = RSVP.updateUserReplyToAttend(data);
      if (rsvpUpdated !== undefined) {
        res.status(201).send({
          status: 201,
          data: [
            {
              meetup: rsvpUpdated.meetup,
              topic: meetup.topic,
              status: rsvpUpdated.response
            }
          ]
        });
      } else {
        res.status(500).send({
          status: 500,
          error: 'Internal server error'
        });
      }
    }
  }
}

export default MeetupController;
