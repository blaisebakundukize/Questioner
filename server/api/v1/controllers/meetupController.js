import Meetup from '../../../models/meetup';
import Tag from '../../../models/tag';

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
      res.status(204).send({
        status: 204,
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
}

export default MeetupController;
