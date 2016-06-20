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
  constructor(Classes, $stateParams) {
    this.class = Classes.getById(+$stateParams.id);
  }
}

angular.module('simpleApp', ['ui.router'])
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('list', {
        url         : '/list?order',
        templateUrl : '15.list.tpl.html',
        controller  : ListCtrl,
        controllerAs: 'list'
      })
      .state('list.item', {
        url         : '/:id',
        templateUrl : '15.list-item.tpl.html',
        controller  : ItemCtrl,
        controllerAs: 'item'
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
        id         : 1,
        name       : 'Intro',
        description: `
                    •	Why Angular JS. Single page application
                    •	Components architecture
                    •	MVVM pattern briefly
                    •	Modularity and file structure
                    •	Building blocks - service, filter, directive, controller and component.
                    •	Services - for model (data) layer
                    •	$provide service. Shortcuts for it bricks
                    •	Dependency injection
                    •	$injector service
                    •	Two stages. Configuration and run`
      }, {
        id         : 2,
        name       : 'Building single page applications',
        description: `
                     •	Templating as V. Directives and components
                     •	Scopes as VM. Digest introduction
                     •	Filters
                     •	Controllers and controllerAs
                     •	History managing
                     •	Introduce ui-router
                     •	Create states and parameters
                     • $http and $resource  services`
      }, {
        id         : 3,
        name       : 'Components',
        description: `
                     •	$compile
                     •	Directives and components
                     •	Bindings 
                     •	Transclusion
                     •	$parse and expressions
                     • $interpolate`
      }];
    },


    getById(id) {
      return this.query()
        .find(item => item.id === id);
    }
  }));