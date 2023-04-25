'use strict';

/**
 * @ngdoc directive
 * @name eparLibsApp.directive:entry
 * @description
 * # entry
 */
angular.module('eparLibsApp')
  .directive('entry', function (entryService, $timeout) {
    return {
      templateUrl: 'views/entry.html',
      replace: true,
      restrict: 'A',
      scope: {
        entry: '=',
        competencies: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.getTextToCopy = function () {
          var text = '';
          angular.forEach(scope.entry.items, function(item, index) {
            if (item.behavioralIndicator && item.example && item.impact) {
              if (index !== 0) { text += 'Also, '; }
              text += 'In the competency of ' + item.competency.name.trim();
              text += ' I ' + item.behavioralIndicator.trim();
              text += ' by ' + item.example.trim();
              text += ' with the impact that ' + item.impact.trim() + '.  ';
            }
          });
          return text;
        };
        scope.textCopied = function () {
          scope.copyText = 'Content copied';
          $timeout(function() { scope.copyText = 'Copy content'; }, 1000);
        };
        scope.removeEntry = function (entry) {
          entryService.remove(entry);
        };
        scope.saveEntry = function () {
          entryService.save(scope.entry);
        };
        scope.setType = function (type) {
          scope.entry.type = type;
          scope.saveEntry();
        };
        scope.setBehavioralIndicator = function (item, behavioralIndicator) {
          item.behavioralIndicator = behavioralIndicator;
          scope.saveEntry();
        };
      }
    };
  });
