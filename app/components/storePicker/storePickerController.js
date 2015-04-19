angular.module('app')
  .controller('storePickerController', function(config, localStorageService, $scope, $state, Restangular) {
    window[config.app.name].scopes.InventoryControllerScope = $scope;

    $scope.search = function() {
      Restangular.one('stores').get({geo: $scope.term}).then(function(response) {
        $scope.stores = response.result;
      });
    };

    $scope.select = function(store) {
      localStorageService.set('store', store);
      $state.go('inventory');
    };
  });