/* globals blanket, module */

var options = {
  modulePrefix: 'web-portal',
  filter: '//.*web-portal/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  branchTracking: true,
  cliOptions: {
    reporters: ['html'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
