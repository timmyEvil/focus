module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine-jquery', 'jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'test/**/*.spec.js'
    ]
  });
};
