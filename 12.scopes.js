class AccessCtrl {
  constructor($scope, $rootScope, $timeout) {
    $scope.type     = 'Child $scope';
    $rootScope.type = 'Root $scope';

    this.$scope     = $scope;
    this.$rootScope = $rootScope;
    this.$timeout   = $timeout;

    this.setGlobalVar();
    this.createScopes();
    this.createBindings();
    this.executeExpressions();
  }

  setGlobalVar() {
    this.$rootScope.title = 'scopes in Angular JS';
  }


  createScopes() {
    const frontEnd = this.$scope.$new();
    const backend  = this.$scope.$new();
    const JS       = frontEnd.$new();

    JS.language = 'Java Script';
    console.log(frontEnd.language); //undefined
    console.log(JS.language);       //'Java Script'
    console.log(backend.language);  //undefined

    frontEnd.isSupportedByBrowsers = true;
    console.log(JS.isSupportedByBrowsers);       //true
    console.log(frontEnd.isSupportedByBrowsers); //true
    console.log(backend.isSupportedByBrowsers);  //undefined

    backend.technology = 'Node JS';
    console.log(JS.technology);       //undefined
    console.log(frontEnd.technology); //undefined
    console.log(backend.technology);  //'Node JS'

    const Elm = frontEnd.$new(true);
    console.log(Elm.isSupportedByBrowsers); //undefined;
  }


  createBindings() {
    this.$scope.value  = 'Start';
    this.$scope.object = { property: 'Start value' };
    this.$scope.now    = Date.now();

    this.$timeout(() => {
      this.$scope.value           = 'After timeout';
      this.$scope.object.property = 'After timeout value'
    }, 1000);
  }


  executeExpressions() {
    this.$scope.firstName = 'Illia';
    this.$scope.lastName  = 'Shevchenko';

    const simpleExpression = this.$scope.$eval('(firstName + " " + lastName).toUpperCase()');
    console.log(simpleExpression);

    const overriddenLocals = this.$scope.$eval('(firstName + " " + lastName).toUpperCase()', {
      lastName: 'Kantor'
    });
    console.log(overriddenLocals);
  }


  doAction() { //for template highlighting
  }
}


angular.module('simpleApp', [])
  .controller('AccessCtrl', AccessCtrl)
  .filter('capitalize', () =>
    (input) => input && input.charAt(0).toUpperCase() + input.slice(1)
  )
  .config(($filterProvider) => {
    $filterProvider.register('capitalize', filterFactory);
  })
  .controller('DateCtrl', function (dateFilter) {
    const now = dateFilter(Date.now(), 'medium');
    console.log(now);
  });


function filterFactory() {

}