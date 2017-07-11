'use strict';

const mw = require('./middleware')
const students = require('./students')
console.log(students,mw)

module.exports = function(app){
  app.use('/students',students);
}

