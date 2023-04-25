'use strict';

/**
 * @ngdoc directive
 * @name eparLibsApp.directive:competencySelect
 * @description
 * # competencySelect
 */
angular.module('eparLibsApp')
  .directive('competencySelect', function (entryService) {
    return {
      templateUrl: 'views/competencySelect.html',
      restrict: 'E',
      scope: {
        eparEntry: '=',
        competencies: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.competencyIsSelected = function(competency) {
          for (var item in scope.eparEntry.items) {
            if (scope.eparEntry.items[item].competency.id === competency.id) {
              return true;
            }
          }
          return false;
        };

        scope.toggleCompetency = function(competency) {
          if (scope.competencyIsSelected(competency)) {
            entryService.removeItem(scope.eparEntry,competency);
          } else {
            entryService.addItem(scope.eparEntry,competency);
          }
        };
      }
    };
  });
