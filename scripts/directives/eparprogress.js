'use strict';

/**
 * @ngdoc directive
 * @name eparLibsApp.directive:eparProgress
 * @description
 * # eparProgress
 */
angular.module('eparLibsApp')
  .directive('eparProgress', function (entryService) {
    return {
      templateUrl: 'views/eparProgress.html',
      restrict: 'E',
      scope: {
        competencies: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.competencyCount = function (competency) {
          return entryService.competencyCount(competency);
        };
      }
    };
  });
