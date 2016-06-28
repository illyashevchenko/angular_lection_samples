class ParentCtrl {
  constructor() {
    this.children = [];
  }

  registerChild(childInterface) {
    this.children.push(childInterface)
  }
}

class ChildCtrl {
  $postLink() {
    this.parent.registerChild(this);
  }
}

angular.module('simpleApp', [])
  .directive('childRequire', () => ({
    restrict        : 'E',
    template        : '<li>Children: {{:: $ctrl.name }}</li>',
    scope           : {},
    bindToController: {
      name: '@'
    },
    require         : {
      parent: '^^parentRequire'
    },
    controller      : ChildCtrl,
    controllerAs    : '$ctrl'
  }))

  .directive('parentRequire', () => ({
    restrict        : 'E',
    transclude      : true,
    template        : '<h3>Children count: {{ $ctrl.children.length }}</h3><ul ng-transclude=""></ul>',
    scope           : {},
    bindToController: {},
    controller      : ParentCtrl,
    controllerAs    : '$ctrl'
  }))

  .directive('arrayRequire', () => ({
    restrict        : 'E',
    template        : '<li>Children</li>',
    scope           : {},
    bindToController: {
      name: '@'
    },
    require         : ['^^parentRequire', 'sibling', '^parentOrSibling', '?optionalSibling'],
    link($scope, $element, $attr, $controllers) {

    }
  }))

  .directive('stringRequire', () => ({
    restrict        : 'E',
    template        : '<li>Children</li>',
    scope           : {},
    bindToController: {
      name: '@'
    },
    require         : '^^parentRequire',
    link($scope, $element, $attr, $controller) {

    }
  }))

  .directive('selfRegister', () => ({
    restrict        : 'E',
    template        : '<li>Children: {{:: $ctrl.name }}</li>',
    scope           : {},
    bindToController: {
      name: '@'
    },
    controller() {
      this.initParent = function (parentCtrl) {
        parentCtrl.registerChild(this);
      }
    },
    controllerAs    : '$ctrl',
    require         : ['selfRegister', '^^parentRequire'],
    link($scope, $element, $attr, $controllers) {
      $controllers[0].initParent($controllers[1])
    }
  }));