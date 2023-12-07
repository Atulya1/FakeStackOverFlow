const express = require("express")
const cors = require('cors')
const questions = require('./controller/questions-controller.js')
const tags = require('./controller/tags-controller.js')
const answers = require('./controller/answers-controller.js')
const searchQuestions = require('./controller/questions-search-controller.js')
const databaseConnection = require('./service/database-service.js')

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/fake_so'

const connection = Object.freeze(new databaseConnection(CONNECTION_STRING));
connection.connect();

const app = express()
app.use(cors())
app.use(express.json());
questions(app);
answers(app);
tags(app);
searchQuestions(app);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 8000);
