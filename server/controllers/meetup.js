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
}


export default new Meetup();
