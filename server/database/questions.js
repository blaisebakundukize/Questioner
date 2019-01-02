export const questionSchema = {
  id: undefined,
  createdOn: undefined,
  createdBy: undefined,
  meetup: undefined,
  title: null,
  body: undefined,
  votes: undefined,
  updatedOn: new Date()
};

const questions = [
  {
    id: 1,
    createdOn: new Date('2019-01-02 08:30'),
    createdBy: 2,
    meetup: 1,
    title: '',
    body: 'Why would I go to the workshop, is it really necessary to attend?',
    votes: 2,
    updatedOn: new Date('2019-01-02 09:30')
  },

  {
    id: 2,
    createdOn: new Date('2019-01-02 08:30'),
    createdBy: 3,
    meetup: 2,
    title: '',
    body: 'About Dart language for mobile and web apps, why would I learn a new language while I know Java, swift and javascript?',
    votes: 1,
    updatedOn: new Date('2019-01-02 09:30')
  },

  {
    id: 3,
    createdOn: new Date('2019-01-02 08:30'),
    createdBy: 2,
    meetup: 4,
    title: '',
    body: 'Why do I need to come for music, film meetup while I can surf the Internet?',
    votes: 0,
    updatedOn: new Date('2019-01-02 09:30')
  }
];

export default questions;
