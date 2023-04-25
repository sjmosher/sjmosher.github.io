'use strict';

/**
 * @ngdoc service
 * @name eparLibsApp.competencyService
 * @description
 * # competencyService
 * Factory in the eparLibsApp.
 */
angular.module('eparLibsApp')
  .factory('competencyService', function ($q, $http) {
    return {
  		getAll : function() {
  			var deferred = $q.defer();

				$http.get('competencies.json')
				.success(function(res) {
					deferred.resolve(res);
				})
				.error(function() {
					deferred.reject();
				});

  			return deferred.promise;
  		}
    };
  });
