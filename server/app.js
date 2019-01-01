import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));

// For testings
module.exports = app;
