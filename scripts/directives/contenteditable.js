'use strict';

/**
 * @ngdoc directive
 * @name eparLibsApp.directive:variableLengthInput
 * @description
 * # variableLengthInput
 */
angular.module('eparLibsApp')
  .directive('contenteditable', function () {
    return {
      require: 'ngModel',
      scope: {
        save: '&'
      },
      link: function(scope, elm, attrs, ctrl) {
        // view -> model
        elm.bind('blur', function() {
          scope.$apply(function() {
            ctrl.$setViewValue(elm.text());
            scope.save();
          });
        });

        // model -> view
        ctrl.$render = function() {
          elm.text(ctrl.$viewValue);
        };
      }
    };
  });
