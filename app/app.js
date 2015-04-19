'use strict';

angular.module('app', [
	'config',
	'ui.router',
  'ng-fastclick',
  'restangular',
  'LocalStorageModule',
  'infinite-scroll'
])

.config(function(config, $httpProvider, $locationProvider, RestangularProvider, $stateProvider, $urlRouterProvider) {
  // $locationProvider.html5Mode(true);
  RestangularProvider.setBaseUrl(config.lcboApi.path);

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common['Authorization'] = 'Token token="' + config.lcboApi.key + '"';

  $stateProvider
    .state('main', {
      url: '',
      abstract: true,
      resolve: {},
      views: {}
    });

  $urlRouterProvider.otherwise('/404');
})

.run(function($anchorScroll, config, $rootScope) {
  $rootScope.config = config;

  window[config.app.name] = {
    config: config,
    scopes: {
      RootScope: $rootScope
    }
  };

  $rootScope.$on('$stateChangeSuccess', function() {
    $anchorScroll();
  });
});