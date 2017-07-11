'use strict';
module.exports = function(sequelize, DataTypes) {
  var students = sequelize.define('students', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    interest: DataTypes.STRING,
    is_deleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return students;
};
