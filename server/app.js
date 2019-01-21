import express from 'express';
import bodyParser from 'body-parser';

// load routes
import meetups from './routes/api/v1/meetups';
import questions from './routes/api/v1/questions';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);

// Handler for 404 - Resource not found
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Resource Not Found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));

// For testings
module.exports = app;
