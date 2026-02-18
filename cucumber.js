module.exports = {
  default: {
    require: [
      'steps/*.js',
      'support/hooks.js'
    ],
    format: [
      'progress',
      'html:reports/report.html',
      'json:reports/report.json'
    ],
  }
};
