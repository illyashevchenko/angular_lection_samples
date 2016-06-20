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
  .factory('Classes', $resource => $resource('16.http.json'))

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
      const result  = isArray ? [] : {};

      result.$promise = promise.then(({ data }) => {
        //transform into an Array of instances, fill the result and return to a promise chain
        return fillTheResult(result, data);
      });

      return result;
    }
  }));

function fillTheResult() {

}