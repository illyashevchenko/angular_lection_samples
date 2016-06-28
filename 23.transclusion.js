angular.module('simpleApp', [])
  .controller('Main', function () {
    this.title = 'Main controller';
  })
  
  .directive('transcluded', () => ({
    restrict        : 'E',
    transclude      : true,
    template        : '<h3>Transcluded</h3><div ng-transclude=""></div>',
    scope           : {},
    bindToController: {},
    controller      : angular.noop,
    controllerAs    : '$ctrl'
  }))

  .directive('transcludedScopes', () => ({
    restrict        : 'E',
    transclude      : true,
    template        : '<h3>Transcluded</h3><div>Main title: {{ main.title }}</div><div ng-transclude=""></div>',
    scope           : {},
    bindToController: {},
    controller      : angular.noop,
    controllerAs    : '$ctrl'
  }))

  .directive('multipleTransclusionError', () => ({
    restrict        : 'A',
    transclude      : true,
    scope           : {},
    bindToController: {},
    controller      : angular.noop,
    controllerAs    : '$ctrl'
  }))

  .directive('multiSlotTranscluded', () => ({
    restrict        : 'E',
    transclude      : {
      controls: 'a',
      content : 'multiContent'
    },
    template        : '<h3>Transcluded</h3><div class="menu" ng-transclude="controls"></div><div class="content" ng-transclude="content"></div>',
    scope           : {},
    bindToController: {},
    controller      : angular.noop,
    controllerAs    : '$ctrl'
  }));