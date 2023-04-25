'use strict';

/**
 * @ngdoc overview
 * @name eparLibsApp
 * @description
 * # eparLibsApp
 *
 * Main module of the application.
 */
angular
  .module('eparLibsApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngClipboard',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath('ZeroClipboard.swf');
  }]);
