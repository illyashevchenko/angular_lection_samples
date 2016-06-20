class ListCtrl {
  constructor(Classes) {
    Classes.query()
      .then(classes => {
        this.classes = classes;
      });
  }
}

angular.module('simpleApp', ['ui.router'])
  .controller('ListCtrl', ListCtrl)
  .factory('Classes', $http => ({
    query() {
      return $http.get('16.http.json')
        .then(classes =>
          classes.data);
    },


    getById(id) {
      return this.query()
        .then(classes =>
          classes.find(item => item.id === id));
    }
  }))
  .config($httpProvider => {
    $httpProvider.useLegacyPromiseExtensions(false)
      .useApplyAsync(true);
  });