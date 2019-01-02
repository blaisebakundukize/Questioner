export const meetupSchema = {
  id: undefined,
  topic: undefined,
  description: null,
  location: null,
  images: null,
  happeningOn: null,
  tags: null,
  createdBy: undefined,
  createdOn: null,
  updatedOn: null
};

const meetups = [
  {
    id: 1,
    topic: 'Andela Bootcamp workshop',
    description: '',
    location: '',
    images: [],
    happeningOn: new Date('2019-01-11 08:30'),
    tags: [1, 2, 4],
    createdBy: 1,
    createdOn: new Date('2019-01-01 19:28'),
    updatedOn: new Date('2019-01-01 19:28')
  },

  {
    id: 2,
    topic: 'Google Developer Day',
    description: '',
    location: '',
    images: [],
    happeningOn: new Date('2019-01-21 08:30'),
    tags: [1, 2, 4],
    createdBy: 1,
    createdOn: new Date('2019-01-01 19:33'),
    updatedOn: new Date('2019-01-01 19:33')
  },

  {
    id: 3,
    topic: 'Creative Every Day Kigali',
    description: '',
    location: '',
    images: [],
    happeningOn: new Date('2019-02-11 08:30'),
    tags: [3],
    createdBy: 1,
    createdOn: new Date('2019-01-01 19:40'),
    updatedOn: new Date('2019-01-01 19:40')
  },

  {
    id: 4,
    topic: 'Kigali Art, Theater, film & Music Meetup',
    description: '',
    location: '',
    images: [],
    happeningOn: new Date('2019-02-15 08:30'),
    tags: [5, 6, 7, 8],
    createdBy: 1,
    createdOn: new Date('2019-01-01 20:40'),
    updatedOn: new Date('2019-01-01 20:40')
  }
];

export default meetups;
