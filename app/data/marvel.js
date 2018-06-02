// Import the ORM to create functions that will interact with the database.
var orm = require("../public/javascript/orm.js");

var marvel = {
  all: function(mm) {
    orm.all("table1","table2", function(res) {
      mm(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals,mm) {
    orm.create("tabl1","table2", cols, vals, function(res) {
    mm(res);
    });
  },
  update: function(cols, vals, mm) {
    orm.update("table1","table2", cols, vals, function(res) {
      mm(res);
    });
  },
  delete: function(cols,vals, mm) {
    orm.delete("table1","table2", cols, vals, function(res) {
      mm(res);
    });
  }
};

// Export the database functions for the controller s
module.exports = marvel;
