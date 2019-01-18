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

/**
 * Validate Question
 * @param {String} question - Body of question
 */
const validateQuestion = question => new Promise((resolve, reject) => {
  if (question.body.length < 50) {
    reject(new Error('Question must be atleast 50 characters long'));
  }
  resolve(true);
});

/**
 * Validate Tags
 * @param {Array} tag - array of tags
 */
const validateTag = tags => new Promise((resolve, reject) => {
  const duplicate = {};
  tags.forEach((tag) => {
    if (tag.length === 0) {
      reject(new Error('Empty tag is not allowed!!!'));
    }
    if (duplicate[tag]) {
      reject(new Error('Duplicate tags Found!!!'));
    } else {
      duplicate[tag] = 1;
    }
  });
  resolve(true);
});

export { validateMeetup, validateQuestion, validateTag };
