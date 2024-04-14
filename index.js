require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected successfully'));

app.use(express.json());

const serverRouter = require('./server')
app.use('/servers', serverRouter)

app.listen(3000, () => {
    console.log("I'm Listening on Port:", 3000);
});
