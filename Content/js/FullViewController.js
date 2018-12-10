app.controller('HomeController', ['$http', '$scope', '$timeout', 'JSDataService', '$urlRouter', '$rootScope', 'JsModalFactory', 'JsPopUpView', 'CacheFactory', '$base64',
    function ($http, $scope, $timeout, JSDataService, $urlRouter, $rootScope, JsModalFactory, JsPopUpView, CacheFactory, $base64) {

    $timeout(function () {

        JSDataService.GetCurrentUser().then(function (CurrentUser) {
            $rootScope.CurrentUser = CurrentUser;
        });

    }, 1000)
  
    //
    //
    //




}]);