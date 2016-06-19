class ParentScopeCtrl {
  constructor($scope) {
    $scope.name = 'Illia Shevchenko';
  }
}

class ParentScopeThisCtrl {
  constructor() {
    this.name = 'Illia Kantor';
  }
}

class ChildScopeCtrl {
}
angular.module('simpleApp', [])
  .controller('ParentScopeCtrl', ParentScopeCtrl)
  .controller('ParentScopeThisCtrl', ParentScopeThisCtrl)
  .controller('ChildScopeCtrl', ChildScopeCtrl);