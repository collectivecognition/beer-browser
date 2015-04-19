angular.module('app')
  .controller('inventoryController', function(config, localStorageService, Restangular, $scope, $state) {
    window[config.app.name].scopes.InventoryControllerScope = $scope;

    $scope.store = localStorageService.get('store');

    if(!$scope.store){
      $state.go('storePicker');
    }

    $scope.products = [];9
    $scope.page = 1;

    $scope.load = function() {
      if($scope.loading || !$scope.page){ return; }

      $scope.loading = true;

      var options = {
        per_page: 100,
        where_not: 'is_dead,is_discontinued',
        order: 'id.desc',
        // q: 'beer',
        page: $scope.page
      };

      Restangular.one('stores', $scope.store.id).one('products').get(options).then(function(response) {
        $scope.products = $scope.products.concat(_.filter(response.result, function(result) {
          return result.primary_category === 'Beer' && result.quantity > 0;
        }));
        $scope.page = response.pager.next_page;
        $scope.loading = false;
      });
    };
  });