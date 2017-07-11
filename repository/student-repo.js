'use strict';

var model = require('../models');
module.exports = {
  create: function(options, success, error) {
    options.data.is_deleted = 0
    model.students.create(options.data).then(success, error);
  },
  retrieve: function(options, success, error) {
    options.where.is_deleted = 0
      model.students.findAll({
        where: options.where
      }).then((data) => {
        success(JSON.parse(JSON.stringify(data)))
      }, error);
  },
  update: function(options, success, error) {
    console.log(options);
    model.students.update(options.data, {
      where: options.where
    }).then(success, error);
  }
}
