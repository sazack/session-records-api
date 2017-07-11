'use strict';

const mw = require('./middleware')
const students = require('./students')

module.exports = function(app){
  app.use('/students',students);
}
