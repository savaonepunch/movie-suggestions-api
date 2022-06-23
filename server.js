require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.on('open', () => console.log('Connected to database'));

app.use(express.json());

const suggestionsRouter = require('./routes/suggestions');

app.use('/suggestions', suggestionsRouter);

app.listen(8000, () => console.log("Server started"));