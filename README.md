[![Build Status](https://travis-ci.com/blaisebakundukize/Questioner.svg?branch=develop)](https://travis-ci.com/blaisebakundukize/Questioner) [![Coverage Status](https://coveralls.io/repos/github/blaisebakundukize/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/blaisebakundukize/Questioner?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/71e04ae0c01a3f8adc6f/maintainability)](https://codeclimate.com/github/blaisebakundukize/Questioner/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/71e04ae0c01a3f8adc6f/test_coverage)](https://codeclimate.com/github/blaisebakundukize/Questioner/test_coverage)


# Questioner
Questioner​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

#### API V1 Available Functionalities

| API Endpoints | Functionality |
| ---| ---|
| GET `/api/v1/meetups` | Fetch all meetups |
| GET `/api/v1/meetups/upcoming` | Fetch all upcoming meetups |
| GET `/api/v1/meetups/<meetupID>` | Fetch a specific meetup |
| POST `/api/v1/meetups/<meetupID>/rsvps` | Send RSVP on a meetup|
| POST `/api/v1/meetups` | Create a meetup|
| POST `/api/v1/questions` | Post a question|
| PATCH `/api/v1/questions/upvote` | Upvote a question|
| PATCH `/api/v1/questions/downvote` | Downvote a question|

#### Access API

> - Access the API Here: [https://questioner-meetup-app.herokuapp.com/api/v1/]
> - Fetching all meetups: [https://agile-dusk-15975.herokuapp.com/api/v1/meetups]
> - For other roots use json data and ids stated below

For creating a meetup you have to post a json data:

```
{
	"topic": "Andela learning communinity meetup",
	"description": "description",
	"location": "location",
	"images": ["image1", "image2", "image3"],
	"happeningOn": "2019-03-29 10:00",
	"tags": ["technology", "programming"],
	"createdBy": 1
}
```

For posting a question on meetup you have to post a json data:

```
{
	"createdBy": 2,
	"meetup": 2,
	"title": "title goes here",
	"body": "About Dart language for mobile and web apps, why would I learn a new language while I know Java, swift and javascript?"
}
```

For posting a RSVP for a meetup attending you have to post a json data:

```
{
	"user": 2,
	"response": "yes" or "no" and "maybe"
}
```

For upvoting a question:

```
{
	"user": 2,
	"question": 2
}
```

For downvoting a question:

```
{
	"user": 3,
	"question": 3
}
```

Data are stored in memory -> data structure and ids for meetups, questions and users are:

```
meetups: 1, 2, 3, 4
questions: 1, 2, 3
users: 1 for admin, 2, 3
tags: "technology", "web technology", "programming", "art", "music", "theater", "film", "creativity"
```

#### Core Technology
> - Back-end: Expressjs
> - Libraries: es6, Babel-Node, eslint, Mocha/Chai + chai-http ect...
> - System Dependencies: Nodejs

#### Getting Started
> **Installation**
> - Clone the repo `https://github.com/blaisebakundukize/Questioner.git` inside foldername
> - Ensure you have installed Nodejs which comes with npm
> - Navigate into the app root directory: `cd foldername`
> - Run `$ npm install` to install all dependencies
> - Run tests to ensure the app is not broken: `npm test`
> - If test fail to run, install mocha globally: `npm install -g mocha`
> - Run tests again

> **How to Demo**
> - To start the app run: `npm start`
> - If failed to start, install nodemon globally: `npm install -g nodemon`

#### Author
> - [Blaise Bakundukize](https://github.com/blaisebakundukize)

