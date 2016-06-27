angular.module('simpleApp', [])
  .factory('$rootScopeEval', () => {
    const Scope = function () {

    };


    Scope.prototype.$eval = function (expr, locals) {
      return $parse(expr)(this, locals);
    };
  })

  .controller('ShowExpressions', function ($parse) {
    const getter = $parse('(firstName + " " + lastName).toUpperCase()');
    const $scope = {
      firstName: 'Illia',
      lastName : 'Shevchenko'
    };
    const locals = {
      lastName: 'Kantor'
    };

    console.log('===== $parse demo =====');
    console.log(getter($scope));
    console.log(getter($scope, locals));

    const lastNameGetter = $parse('lastName');
    const setter         = lastNameGetter.assign;
    setter($scope, 'Andrii');

    console.log($scope.lastName); //'Andrii'
  })

  .controller('ShowFunctionExpressions', function ($parse, $log) {
    const getter = $parse('onClick(name, $event)');
    const $scope = {
      name: 'Illia',
      onClick(value, $event) {
        $log.debug('Submit the value: ', value, $event);
      }
    };
    const locals = {
      $event: new MouseEvent({})
    };

    getter($scope, locals);
  })

  .factory('registerTheDirective', ($compileProvider) => ({
    directive(creator) {
      return $compileProvider.directive('onlyTemplate', creator);
    }
  }))

  .directive('onlyTemplate', () => ({
    template: '<div>Some text</div>'
  }))

  .directive('restrictElement', () => ({
    restrict: 'E',
    template: '<div>This directive is restricted to an element</div>'
  }))

  .directive('restrictAttribute', () => ({
    restrict: 'A',
    template: '<div>This directive is restricted to an attribute</div>'
  }))

  .directive('templateFromUrl', () => ({
    restrict   : 'AE',
    templateUrl: '20.directive.tpl.html'
  }))

  .directive('simplyLinked', () => ({
    restrict: 'A',
    template: '<div>This directive will be simply linked</div>',
    link($scope, $element) {
      $element[0].innerHTML = '<div>This directive is simply linked</div>';
    }
  }))


  .directive('fullCompileDefinition', () => ({
    restrict: 'AE',
    template: '<div>Here is a directive with full compile and link functions definitions<b simply-linked=""></b></div>',
    compile(tElement, tAttrs) {
      console.log('As you can see we can\'t access $scope here.');
      console.log('But we can see element: ', tElement[0]);
      console.log('And attributes here: ', tAttrs);
      console.log('But children elements are not compiled: ', tElement.find('b').text());

      return {
        pre($scope, $element, $attrs) {
          console.log('We can access scope here: ', $scope);
          console.log('But children elements are not linked: ', $element.find('b').text());
        },
        post($scope, $element, $attrs) {
          console.log('Finally children elements are linked: ', $element.find('b').text());
        }
      }
    },
    link() {
      console.error('Link property in the case is ignored');
    }
  }))


  .directive('fullLinkDefinition', () => ({
    restrict: 'AE',
    template: '<div>Here is a directive with full link functions definitions<b simply-linked=""></b></div>',
    link    : {
      pre($scope, $element, $attrs) {
      },
      post($scope, $element, $attrs) {
      }
    }
  }))


  .directive('postLinkDefinition', () => ({
    restrict: 'AE',
    template: '<div>Here is a directive with post link functions definitions (mostly used)<b simply-linked=""></b></div>',
    link ($scope, $element, $attrs) {
    }
  }))


  .directive('simpleDirective', () => {
    console.log('This message will be shown only once');

    return {
      restrict: 'AE',
      template: '<div>Here is an example of multiply directive matching</div>',
      compile() {
        console.log('Compile simpleDirective');

        return () => {
          console.log('link simpleDirective');
        }; // link function
      }
    }
  })

  .directive('simpleDirective', () => ({
    restrict: 'AE',
    compile() {
      console.log('Compile another simpleDirective');

      return () => {
        console.log('link another simpleDirective');
      }; // link function
    }
  }))

  .directive('notUsedDirective', () => {
    console.log('This message will be never shown');

    return {
      restrict: 'AE',
      link(){
      }
    };
  })

  .directive('controlleredDirective', () => ({
    restrict    : 'AE',
    template    : '<div>This is a directive with a controller: {{:: $ctrl.note }}</div>',
    controller() {
      this.note = 'The recommended way to use directives';
    },
    controllerAs: '$ctrl'
  }))

  .directive('stringControlleredDirective', () => ({
    restrict    : 'AE',
    template    : '<div>This is a directive with a controller: {{:: $ctrl.note }}</div>',
    controller  : 'StringCtrl',
    controllerAs: '$ctrl'
  }));


