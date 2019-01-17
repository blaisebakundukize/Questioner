/**
 * Validate function for a new meetup
 * @param {Object} data - Data to validate
 */
const validateMeetup = data => new Promise((resolve, reject) => {
  if (data.topic.length > 50 || data.topic.length <= 3) {
    reject(new Error('Meetup topic should be at least 4 to 50 characters'));
  }
  if (parseFloat(data.topic) || parseFloat(data.description)) {
    reject(new Error('Meetup topic and description should be characters'));
  }
  if (data.description.length < 20) {
    reject(new Error('Meetup descrition should be at least 20 characters long'));
  }
  if (data.location.length === 0) {
    reject(new Error('Meetup Location is required'));
  }
  if (typeof data.createdBy === 'string' || data.createdBy === undefined) {
    reject(new Error('UserId as createBy should be a number'));
  }
  resolve(true);
});

export default validateMeetup;
