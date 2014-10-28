var pickFiles     = require("broccoli-static-compiler");
var coffee        = require("broccoli-coffee");
var es6           = require("broccoli-es6-module-transpiler");
var merge         = require('broccoli-merge-trees');
var moveFile      = require('broccoli-file-mover');

var source = pickFiles("src", {
  srcDir: "/",
  files: ["**/*.coffee", "**/*.js"],
  destDir: "/flexure"
});

source = coffee(source, {
  bare: true,
});

source = es6(source, {
  formatter: "bundle",
  output: "ember-flexure.js"
});

module.exports = source;
