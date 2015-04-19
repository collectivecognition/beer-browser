angular.module('app')

.config(function($stateProvider, config) {
  $stateProvider
    .state('inventory', {
      parent: 'main',
      url: '/inventory',
      data: {},
      views: {
        'content@': {
          templateUrl: 'inventory.html',
          controller: 'inventoryController'
        }
      }
    });
});