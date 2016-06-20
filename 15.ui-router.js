class ListCtrl {
  constructor(Classes, $stateParams) {
    const { order = 'asc' } =  $stateParams;

    this.classes = Classes.query();
    this.order   = 'name';

    if (order === 'desc') {
      this.order = `-${ this.order }`;
    }
  }
}

class ItemCtrl {
  constructor() {
  }
}

angular.module('simpleApp', [
  'ui.router'
])
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('list', {
        url         : '/list?order',
        templateUrl : '15.list.tpl.html',
        controller  : ListCtrl,
        controllerAs: 'list'
      })
      .state('info', {
        url       : '/info',
        template  : '<h2>This is an info page</h2>',
        controller: angular.noop
      });

    $urlRouterProvider.otherwise('/list');
  })
  .factory('Classes', () => ({
    query() {
      return [{
        name: 'Intro'
      }, {
        name: 'Building single page applications'
      }, {
        name: 'Components'
      }];
    }
  }));