/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

var fs = require('fs');

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
    console.log("Running after_serve hook.");
    fs.writeFile('./web/js/config/configuration.json', JSON.stringify(process.env), (err) => {
      if(err) return console.log(err);
      console.log("Service URL configured with " + JSON.stringify(process.env));
    });
  	resolve();
  });
};
