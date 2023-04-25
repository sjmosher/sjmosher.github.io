'use strict';

/**
 * @ngdoc service
 * @name eparLibsApp.entryService
 * @description
 * # entryService
 * Factory in the eparLibsApp.
 */
angular.module('eparLibsApp')
  .factory('Entry', function() {
  	function Entry(entryData) {
  		if (entryData) {
  			this.setData(entryData);
  		}
  	}
  	Entry.prototype = {
  			setData: function(entryData) {
  				angular.extend(this, entryData);
  			}
  	};
  	return Entry;
  })
  .factory('entryService', function ($q, Entry) {
    return {
      _pool: null,
      _findById: function(arr, id) {
      	for(var el in arr) {
      		// hasOwnProperty ensures prototypes aren't considered
      		if(arr.hasOwnProperty(el)) {
      			if(arr[el].id === id) {
              return arr[el];
            }
      		}
      	}

      	return undefined;
      },
  		_retrieveInstance: function(entry) {
  			var instance = this._findById(this._pool, entry.id);

  			if (instance) {
  				instance.setData(entry);
  			} else {
  				instance = new Entry(entry);
  				this._pool.push(instance);
  			}

  			return instance;
  		},

      // Public methods
      getAll: function () {
        var deferred = $q.defer();

        this._pool = localStorage.eparEntries ? JSON.parse(localStorage.eparEntries) : [];

        deferred.resolve(this._pool);
        return deferred.promise;
      },
      save: function (entry) {
        var deferred = $q.defer();

        var instance = this._findById(this._pool, entry.id);
        instance = entry;
        localStorage.eparEntries = JSON.stringify(this._pool);

        deferred.resolve(this._pool);
        return deferred.promise;
      },
      addOne: function () {
        var deferred = $q.defer();

        var lastId = 0;
        if (this._pool.length > 0) {
          lastId = this._pool.sort(function(a, b) { return a.id - b.id; })[this._pool.length-1].id;
        }

        this._pool.push({ id: lastId+1, items: []});

        localStorage.eparEntries = JSON.stringify(this._pool);

        deferred.resolve(this._pool);
        return deferred.promise;
      },
      remove: function (entry) {
        var deferred = $q.defer();

        var index = this._pool.indexOf(entry);
        this._pool.splice(index,1);
        localStorage.eparEntries = JSON.stringify(this._pool);

        deferred.resolve(this._pool);
        return deferred.promise;
      },
      removeItem: function (entry,competency) {
        var scope = this;

        var eIndex = scope._pool.indexOf(entry);
        for (var item in scope._pool[eIndex].items) {
          if (scope._pool[eIndex].items[item].competency.id === competency.id) {
            scope._pool[eIndex].items.splice(item,1);
          }
        }

        localStorage.eparEntries = JSON.stringify(this._pool);
      },
      addItem: function (entry,competency) {
        var scope = this;

        var eIndex = scope._pool.indexOf(entry);
        scope._pool[eIndex].items.push({competency: competency});

        localStorage.eparEntries = JSON.stringify(this._pool);
      },
      competencyCount: function (competency) {
        var count = 0;
        angular.forEach(this._pool, function(e) {
          angular.forEach(e.items, function(i) {
            if (competency.id === i.competency.id) {
              count++;
            }
          });
        });

        return count;
      }
    };
  });
