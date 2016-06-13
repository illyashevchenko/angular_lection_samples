angular.module('firstApp', [])

  .factory('funnyFct', () => ({
    makeFun() {
      return 'Ha-ha-ha';
    }
  }))
  .controller('ViewDevCtrl', funnyFct => {
    // after some exhausting job
    funnyFct.makeFun();
  });
