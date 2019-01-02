export const rsvpSchema = {
  id: undefined,
  meetup: undefined,
  user: undefined,
  response: undefined,
  createdOn: new Date(),
  updatedOn: new Date()
};

const rsvps = [
  {
    id: 1,
    meetup: 2,
    user: 3,
    response: 'yes',
    createdOn: new Date(),
    updatedOn: new Date()
  },

  {
    id: 2,
    meetup: 4,
    user: 3,
    response: 'no',
    createdOn: new Date(),
    updatedOn: new Date()
  }
];

export default rsvps;
