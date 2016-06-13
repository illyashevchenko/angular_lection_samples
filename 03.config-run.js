angular.module('firstApp', [])

  .constant('foreverConst', 'Will never change')
  .value('justVal', { just: 'value' })

  .factory('funnyFct', () => ({}))
  .service('CoolSrv', function () {})

  .provider('great', function () {
    this.$get = () => {};
  })

  .config((foreverConst, greatProvider, $provide) => {
    //configure providers
  })
  /*
  .config((justVal, funnyFct, CoolSrv) => {
    //ERROR!
  })*/

  .run((foreverConst, justVal, funnyFct, CoolSrv) => {
    //run
  })
/*

  .run((greatProviderProvider, $provide) => {
    //ERROR!
  })*/;
