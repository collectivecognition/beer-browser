angular.module('app')

.config(function($stateProvider, config) {
  $stateProvider
    .state('storePicker', {
      parent: 'main',
      url: '/store-picker',
      data: {},
      views: {
        'content@': {
          templateUrl: 'storePicker.html',
          controller: 'storePickerController'
        }
      }
    });
});