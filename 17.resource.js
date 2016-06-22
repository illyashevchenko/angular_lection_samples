class ListCtrl {
  constructor(Classes) {
    this.classes = Classes.query();
  }
}

angular.module('simpleApp', ['ngResource'])
  .controller('ListCtrl', ListCtrl)
  .factory('Classes', $resource => {
    return $resource('default-url/:id', {
      id: '@id'
    }, {
      getById: {
        url    : 'get-by-id/:id',
        method : 'GET',
        params : {
          id: '@identifier'
        },
        isArray: false
      }
    });
  })
  .factory('Classes', $resource => $resource('16.http.json', null, {
    get: {
      url   : '17.class-:id.json',
      params: {
        id: '@id'
      },
      method: 'GET'
    }
  }))

  .factory('ClassesMethods', $resource => {
    const Classes = $resource('16.http.json', null, {
      update: {
        url   : '17.class-:id.json',
        method: 'PUT'
      }
    });

    Classes.prototype.save = function () {
      if (this.id) {
        return this.$update();
      }
      
      return this.$save();
    };

    return Classes;
  })

  .constant('pseudoConfig', {
    defaultUrl: 'default-url',
    query     : {
      url    : null,
      method : 'get',
      isArray: true
    }
  })
  .factory('queryPseudo', ($http, config) => ({
    query() {
      const { url = config.defaultUrl, isArray, method } = config.query;
      const promise = $http[method](url);
      const result  = isArray ? [] : new Resource({});

      result.$promise = promise.then(({ data }) => {
        //transform into an Array of instances, fill the result and return to a promise chain
        return fillTheResult(result, data);
      });

      return result;
    }
  }));

function fillTheResult() {

}

function Resource() {

}