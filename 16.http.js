class ListCtrl {
  constructor(Classes) {
    Classes.query()
      .then(classes => {
        this.classes = classes;
      });

    Classes.getByName();
  }
}

angular.module('simpleApp', [])
  .controller('ListCtrl', ListCtrl)
  .factory('Classes', ($http, $log) => ({
    query() {
      return $http.get('16.http.json')
        .then(classes =>
          classes.data);
    },

    getById(id) {
      return this.query()
        .then(classes =>
          classes.find(item => item.id === id));
    },

    getByName() {
      return $http.get('16.http-names.json')
        .then(names => {
          $log.debug('Received names: ', names.data);
          return names;
        });
    }
  }))

  .config($httpProvider => {
    $httpProvider.useLegacyPromiseExtensions(false)
      .useApplyAsync(true);
  })

  .factory('LogErrorInterceptor', ($q, $log) => ({
    responseError(rejection) {
      $log.error('Something went wrong with request to: ', rejection.config.url);

     return $q.reject(rejection);
    }
  }))

  .factory('MyInterceptor', () => ({
    request() {},
    requestError() {},
    response() {},
    responseError() {}
  }))
  .config($httpProvider => {
    // $httpProvider.interceptors.push('MyInterceptor');
    $httpProvider.interceptors.push('LogErrorInterceptor');
  });