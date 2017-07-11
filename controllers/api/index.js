'use strict';

const mw = require('./middleware')
const students = require('./students')

console.log(students)

module.exports = function(app){
  app.use('/students',students);
}
