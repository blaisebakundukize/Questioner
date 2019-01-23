/* eslint-disable no-restricted-globals */
import Joi from 'joi';

/**
 * Validate user details
 * @param {Object} user - user details
 * @returns {Promise} Resolve or reject
 */
const validateUser = (user) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    othername: Joi.string().allow('').min(3).max(50)
      .optional(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
    username: Joi.string().min(8).max(50).required(),
    password: Joi.string().min(6).max(30).required()
  });

  return new Promise((resolve, reject) => {
    const { error } = Joi.validate(user, schema);
    if (error) {
      reject(error.details[0]);
    }
    resolve(true);
  });
};

/**
 * Validate function for a new meetup
 * @param {Object} data - Data to validate
 */
const validateMeetup = data => new Promise((resolve) => {
  const error = [];
  if (data.topic.trim().length > 50 || data.topic.trim().length <= 3) {
    error.push('Meetup topic should be at least 4 to 50 characters');
  }
  if (parseFloat(data.topic) || parseFloat(data.description)) {
    error.push('Meetup topic and description should be characters');
  }
  if (data.description.trim().length < 20) {
    error.push('Meetup descrition should be at least 20 characters long');
  }
  if (data.location.trim().length === 0) {
    error.push('Meetup Location is required');
  }
  if (typeof data.createdBy !== 'number' || data.createdBy === 0) {
    error.push('UserId as createBy is required and should be a number');
  }

  const d = new Date(data.happeningOn);
  if (isNaN(d.valueOf())) {
    error.push('happeningOn should be a valid date');
  }
  // Check duplicate tags
  {
    const duplicate = {};
    data.tags.forEach((tag) => {
      if (tag.trim().length === 0) {
        error.push('Empty tag does not allowed!!!');
      }
      if (duplicate[tag]) {
        error.push('Duplicate tags Found!!!');
      } else {
        duplicate[tag] = 1;
      }
    });
  }
  resolve(error);
});

/**
 * Validate Question
 * @param {String} question - Body of question
 */
const validateQuestion = question => new Promise((resolve) => {
  const error = [];
  if (question.body.trim().length < 50 || !isNaN(parseFloat(question.body.trim()))) {
    error.push('Question must be atleast 50 characters long');
  }
  if (question.title.trim().length < 15 || !isNaN(parseFloat(question.title.trim()))) {
    error.push('Question title must be atleast 20 characters long');
  }
  if (typeof question.createdBy !== 'number' || question.createdBy === 0) {
    error.push('User id is required and should be a number');
  }
  resolve(error);
});

/**
 * Validate user id
 * @param {Number} id - user id
 * @return {Promise} reject or resolve
 */
const validateUserId = id => new Promise((resolve, reject) => {
  if (typeof id !== 'number' || id === 0) {
    reject(new Error('User id is required and should be a number'));
  }
  resolve(true);
});

/**
 * Validate user id
 * @param {Object} data - user rsvp
 * @return {Promise} reject or resolve
 */
const validateRSVP = data => new Promise((resolve) => {
  const error = [];
  if (typeof data.user !== 'number' || data.user === 0) {
    error.push('User id is required and should be a number');
  }
  const response = data.response.toLowerCase();
  if (response !== 'no' && response !== 'yes' && response !== 'maybe') {
    error.push('Response should be no, yes or maybe');
  }
  resolve(error);
});

export {
  validateMeetup,
  validateQuestion,
  validateUserId,
  validateRSVP,
  validateUser
};
