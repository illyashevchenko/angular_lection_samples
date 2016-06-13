exports.default = angular.module('firstApp', [])
  .constant('foreverConst', 'Will never change')
  .value('justVal', { just: 'value' })

  .factory('funnyFct', funnyFct)
  .factory('funnyFct', () => ({
    makeFun() {
      return 'Ha-ha-ha';
    }
  }))
  // .service('CoolSrv', $provider => $provider.factory('funnyFct', ...))
  .service('CoolSrv', CoolSrv)
  .provider('greatProvider', greatProvider)

  .decorator('funnyFct', decorateFunnyFct)


  .config(() => {
    //something that is called on config stage
  })

  .config(() => {
    //something that is called on config stage too
  })

  .run(() => {
    //something that is called on run stage
  })

  .provider('great', () => {})
  .constant('foreverConst', () => {})
  .config((foreverConst, greatProvider, $provide) => {
    //configure providers
  })


  .value('justVal', () => {})
  .factory('funnyFct', () => {})
  .service('CoolSrv', () => {})

  .config((justVal, funnyFct, CoolSrv) => {
    //ERROR!
  })

  .run((foreverConst, justVal, funnyFct, CoolSrv) => {
    //run
  })

  .run((greatProvider, $provide) => {
    //ERROR!
  })
  
  .filter('markdown', markdownFilter)

  .controller('ViewDevCtrl', ViewDevCtrl)

  .controller('ViewDevCtrl', funnyFct => {
    // after some exhausting job
    funnyFct.makeFun();
  })

  .controller('ViewDevCtrl', $injector => {
    const funnyFct = $injector.get('funnyFct');
  })

  .controller('ViewDevCtrl', (funnyFct, greatProvider, CoolSrv) => {
  })
  .controller('ViewDevCtrl', $injector => {
    const funnyFct      = $injector.get('funnyFct');
    const greatProvider = $injector.get('greatProvider');
    const CoolSrv       = $injector.get('CoolSrv');
  })

  .controller('ViewDevCtrl', (funnyFct, greatProvider) => {
  })

  .controller('ViewDevCtrl', ['funnyFct', 'greatProvider', (funnyFct, greatProvider) => {
  }])

  .controller('ViewDevCtrl', ViewDevCtrl)

  .directive('showHide', coffeeDirective)
  .component('carousel', {})

  .name;


const injections = CtrlConstructor.toString();// function (funnyFct, greatProvider) {}


function CtrlConstructor() {
  return injections;
}

function CoolSrv() {

}

function funnyFct() {

}

function greatProvider() {

}

function decorateFunnyFct() {

}

function markdownFilter() {

}

function ViewDevCtrl(funnyFct, greatProvider) {

}

angular.module().controller('ViewDevCtrl', ViewDevCtrl);
ViewDevCtrl.$inject = ['funnyFct', 'greatProvider'];

function coffeeDirective() {

}