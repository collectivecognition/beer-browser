angular.module('app')
  .controller('inventoryController', function(config, localStorageService, Restangular, $scope, $state) {
    window[config.app.name].scopes.InventoryControllerScope = $scope;

    $scope.store = localStorageService.get('store');

    if(!$scope.store){
      $state.go('storePicker');
    }

    $scope.products = [];
    $scope.page = 1;
    $scope.category = 'Beer';

    $scope.load = function() {
      if($scope.loading || !$scope.page){ return; }

      $scope.loading = true;

      var options = {
        per_page: 100,
        where_not: 'is_dead,is_discontinued',
        order: 'id.desc',
        page: $scope.page
      };

      Restangular.one('stores', $scope.store.id).one('products').get(options).then(function(response) {
        $scope.products = $scope.products.concat(response.result);
        $scope.page = response.pager.next_page;
        $scope.loading = false;

        // Cache whether

        var cache = localStorageService.get('cache');
        if(!cache){
          cache = {
            stores: {}
          };
        }
        if(!cache.stores[$scope.store.id]){
          cache.stores[$scope.store.id] = {};
        }
        _.each(response.result, function(product) {
          if(!cache.stores[$scope.store.id][product.id]){
            cache.stores[$scope.store.id][product.id] = {
              seen: true
            };
            product.new = true;
          }
        });
        localStorageService.set('cache', cache);
      });
    };
  })

  .filter("filters", function($filter){
    return function(input, primary, secondary){
      return _.filter(input, function(item) {
        return (!primary || item.primary_category === primary) 
          && (!secondary || item.secondary_category === secondary)
          && (primary !== 'Beer' || !item.name.match(/sake/ig))
          && item.quantity > 0;
      });
    };
  });

