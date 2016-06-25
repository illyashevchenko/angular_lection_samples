angular.module('simpleApp', [])
  .directive('sameScope', () => ({
    rectrict: 'A',
    controller($scope) {
      $scope.title = 'This is a sameScope controller';
    },
    template: '<div>Same scope directive: {{ title }}<br/>{{ appName }}</div>',

    controllerAs: '$ctrl'
  }))

  .directive('childScope', () => ({
    rectrict: 'A',
    scope   : true,
    controller($scope) {
      $scope.title = 'This is a childScope controller';
    },
    template: '<div>Child scope directive: {{ title }}<br/>{{ appName }}</div>',

    controllerAs: '$ctrl'
  }))

  .directive('isolatedScope', () => ({
    rectrict: 'A',
    scope   : {},
    controller($scope) {
      $scope.title = 'This is an isolatedScope controller';
    },
    template: '<div>Isolated scope directive: {{ title }}<br/>{{ appName }}</div>',

    controllerAs: '$ctrl'
  }));


class MainCtrl {
  constructor($scope, $log) {
    $scope.title   = 'This is a main controller';
    $scope.appName = 'Scopes demo';

    this.$log = $log;

    this.titleKey = 'info.name';

    this.list = [{
      id  : 1,
      info: {
        name: 'Illia'
      }
    }, {
      id  : 2,
      info: {
        name: 'Dmytro'
      }
    }];
  }

  onLink(message) {
    this.$log.debug('Linked: ', message);
  }
}


class DirectiveCtrl {
  constructor($parse) {
    this.$parse = $parse;
  }

  getValue() {
    return this.$parse(`list[${ this.index }].${ this.key }`)(this);
  }
}

angular.module('simpleApp')
  .controller('Main', MainCtrl)
  .directive('bindingsToScope', () => ({
    rectrict  : 'A',
    scope     : {
      key    : '<titleKey',
      list   : '=*items',
      binding: '=',
      index  : '@bindingsToScope',
      onLink : '&'
    },
    controller: DirectiveCtrl,
    template  : '<div>Bindings. Key: {{ $ctrl.key }}. Index: {{ $ctrl.index }}. Value: {{ $ctrl.getValue() }}</div>',

    bindToController: true,
    controllerAs    : '$ctrl'
  }));