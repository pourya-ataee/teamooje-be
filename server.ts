import express from 'express';
import config from './modules/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/teamooje');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/public', express.static('public'));

const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

app.use('/api', apiRouter);
app.use('/', webRouter);

app.listen(config.port, () => {
	console.log(`Server running at Port ${config.port}`);
});
