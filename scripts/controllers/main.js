'use strict';

/**
 * @ngdoc function
 * @name eparLibsApp.controller:MainCtrl
 * oBaDa KaDr!
 * @description
 * # MainCtrl
 * Controller of the eparLibsApp
 */
angular.module('eparLibsApp')
  .controller('MainCtrl', function ($scope, competencyService, entryService) {
    competencyService.getAll().then( function(res){
      $scope.competencies = res;
    });

    entryService.getAll().then( function(res){
      $scope.entries = res;
    });

    $scope.addOne = function() {
      entryService.addOne().then( function(res){
        $scope.entries = res;
      });
    };
  });
