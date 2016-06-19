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
    this.$rootScope.title = 'Scopes in Angular JS';
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

    this.$timeout(() => {
      this.$scope.value           = 'After timeout';
      this.$scope.object.property = 'After timeout value'
    }, 1000);
  }


  executeExpressions() {
    this.$scope.firstName = 'Illia';
    this.$scope.lastName  = 'Shevchenko';

    console.log(this.$scope.$eval('(firstName + " " + lastName).toUpperCase()'));
    console.log(this.$scope.$eval('(firstName + " " + lastName).toUpperCase()', { lastName: 'Kantor' }));
  }


  //PSEUDO METHODS
  bindValueExpressionPseudo() {
    this.$scope.$watch('value', updateBinding);
  }


  $timeoutPseudo(callback, timeout) {
    //after timeout
    callback();
    this.$rootScope.$apply();
  }


  doAction() {
  }
}


angular.module('simpleApp', [])
  .controller('AccessCtrl', AccessCtrl);


function updateBinding() {
}