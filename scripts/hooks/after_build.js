/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

const child_process = require("child_process");
const fs = require('fs');

'use strict';

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
    console.log("Running after_build hook.");
    fs.writeFile('./web/js/config/configuration.json', JSON.stringify(process.env), (err) => {
      if(err) return console.log(err);
      console.log("Service URL configured with " + JSON.stringify(process.env));
      child_process.exec("node node_modules/requirejs/bin/r.js -o build.js", (error, stdout, stderr) => {
        if(error){
          console.log(error.message);
          return;
        }
        if(stderr){
          console.log(stderr);
          return;
        }
        console.log(stdout);
        child_process.exec("uglifyjs web/js/main.optimized.js -o web/js/main.min.js --compress --mangle",(error, stdout, stderr) => {
          if(error){
            console.log(error.message);
            return;
          }
          if(stderr){
            console.log(stderr);
            return;
          }
          console.log(stdout);
          child_process.exec("rm web/js/main.optimized.js web/js/main.js",(error, stdout, stderr) => {
            if(error){
              console.log(error.message);
              return;
            }
            if(stderr){
              console.log(stderr);
              return;
            }
            console.log(stdout);
            resolve();
          });
        });
      });
    });
  });
};
