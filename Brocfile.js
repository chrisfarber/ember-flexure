var pickFiles     = require("broccoli-static-compiler");
var coffee        = require("broccoli-coffee");
var es6           = require("broccoli-es6-module-transpiler");
var merge         = require("broccoli-merge-trees");
var moveFile      = require("broccoli-file-mover");
var concat        = require("broccoli-concat");
var AMDFormatter  = require("es6-module-transpiler-amd-formatter");

var source = pickFiles("src", {
  srcDir: "/",
  files: ["**/*.coffee", "**/*.js"],
  destDir: "/flexure"
});

source = coffee(source, {
  bare: true,
});

var AMDBuild = es6(source, {
  formatter: new AMDFormatter()
});

AMDBuild = concat(AMDBuild, {
  inputFiles: ["**/*.js"],
  separator: "\n",
  outputFile: "/ember-flexure.amd.js"
});

var globalBuild = es6(source, {
  formatter: "bundle",
  output: "ember-flexure.js"
});


module.exports = merge([globalBuild, AMDBuild]);
