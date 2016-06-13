class ItemsListCtrl {
  $onInit() {
    const defaultItem = this.list[this.defaultIndex];
    this.select(defaultItem);
  }


  select(item) {
    this.selected = item;
    this.onSelect({ item });
  }
}


angular.module('bindings', [])
  .directive('itemsListDefault', () => ({
    scope           : {},
    bindToController: {
      defaultIndex: '@defaultItemIndex',
      list        : '<itemsListDefault',
      onSelect    : '&onItemSelect'
    },

    controller  : ItemsListCtrl,
    controllerAs: 'ctrl',
    templateUrl : './items-list-default.html'
  }))


  .controller('Main', function () {
    this.list = ['1.3', '1.4', '1.5', '2.0'];
    this.onVersionChange = function (version, scope, locals) {
      console.log(version, scope, locals)
    }
  });
