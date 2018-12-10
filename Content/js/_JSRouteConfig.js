app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: false
        });
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;
}]);