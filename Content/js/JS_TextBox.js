app.directive("jsinput", ['$parse', '$timeout', 'JSDataService', 'JsModalFactory', function ($parse, $timeout, JSDataService, JsModalFactory) {
    return {
        restrict: 'E',
        require: ['ngModel', '^?form'],
        scope: {
            caption: '@',
            name: '@?',
            type: '@',
            bindModel:'=ngModel',
            ngDisabled: '=?',
        },
        link: function ($scope, element, attr, controllers) {
            
            if (attr.ngRequired == "true") {
                element.addClass('is-required'); 
            }

            $scope.hasError = function () {
                if (controllers[1] == null) return false;
                if (controllers[1].$submitted == false) return false;
                return !angular.equals({}, controllers[0].$error);
            }

            $scope.isRequired = function () {
                if (controllers[1] == null) return false;
                if (controllers[1].$submitted == false) return false;
                if (controllers[0].$error.required == undefined) return false;
                return !angular.equals({}, controllers[0].$error.required);
            }
        },
        templateUrl: '../Templates/JSTextBox.tpl.html'
    };
}]);