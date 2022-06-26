require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const corsOptions = {
   origin: '*',
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

const app = express();

app.use(cors(corsOptions)) // Use this after the variable declaration

mongoose.connect(process.env.SUGGESTIONS_DATABASE_URL, { useNewUrlParser: true });
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 

const suggesitonsDb = mongoose.connections[0];
// const authDb = mongoose.connections[1];

suggesitonsDb.on('error', (err) => console.error(err));
suggesitonsDb.on('open', () => console.log('Connected to the suggestions database'));

// authDb.on('error', (err) => console.error(err));
// authDb.on('open', () => console.log('Connected to the auth database'));

app.use(express.json());

const suggestionsRouter = require('./routes/suggestions');
const authRouter = require('./routes/auth');

app.use('/suggestions', suggestionsRouter);
app.use('/user', authRouter);

app.listen(8000, () => console.log("Server started"));