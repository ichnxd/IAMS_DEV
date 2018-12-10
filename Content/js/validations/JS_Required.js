app.directive('jsRequired', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        require: 'ngModel',
        link: function ($scope, element, attr, controllers) {

        }
    }
}]);