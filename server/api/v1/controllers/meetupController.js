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
    const data = meetups.map((meetup) => {
      const tags = Tag.getTags(meetup.tags);
      const meetupFound = {
        id: meetup.id,
        title: meetup.topic,
        location: meetup.location,
        happeningOn: meetup.happeningOn,
        tags: tags.map(tag => tag.name)
      };
      return meetupFound;
    });

    res.status(200).send({
      status: 200,
      data
    });
  }
}

export default MeetupController;
