app.directive("jslookup", ['$parse', '$timeout', 'JSDataService', 'JsModalFactory', function ($parse, $timeout, JSDataService, JsModalFactory) {
    return {
        restrict: 'E',
        require: ['ngModel','^?form'],
        scope: {
            controlName: '@?',
            caption: '@?',
            list: '=?list',
            url: '@',
            modelName: '@',
            displayProperty: '@',
            displayProperties: '=',
            ngModel: '=',
            dataStuff: '=?',
            validator: '=?'
        },
        link: function ($scope, element, attr, controllers) {
            
            if (attr.ngRequired == "true") {
                element.addClass('is-required');
            }

            if (attr.disabled) {
                element.addClass('is-disabled');
            }

            if ($scope.displayProperty == undefined) $scope.displayProperty = "Name";
            if ($scope.url == undefined) $scope.url = 'api/DataService/Query';
            if ($scope.dataStuff == undefined) $scope.dataStuff = { };
            
            $scope.Refresh = function (IsClear) {
                if ($scope.searchText != undefined) {
                    $scope.dataStuff.filterText = $scope.searchText.trim() === '' ? null : $scope.searchText.trim();
                } else {
                    filterText = '';
                }
                $scope.dataStuff.ClassName = $scope.modelName;
                JSDataService.GetCollection($scope.url, $scope.dataStuff).then(function (collection) {
                    if ($scope.list == undefined) $scope.list = [];
                    if (collection != null) {
                        if (IsClear) {
                            $scope.list = collection;
                        } else {
                            $.each(collection, function (i, o) {
                                $scope.list.push(o);
                            });
                        }
                        
                    } else {
                        $scope.list = null;
                    }
                });
            }
            
            $scope.OnItemSelected = function (object) {
                $scope.ngModel = object;
                $scope.searchText = object[$scope.displayProperty];
            }

            $scope.Remove = function () {
                $scope.ngModel = null;
                $scope.searchText = '';
            }

            var IsInit = false;

            $(element).find('.input-group').on('show.bs.dropdown', function () {
                if (!IsInit) $scope.Refresh();
                IsInit = true;
            } )

            $timeout(function () {
                var width = $(element).find('.input-group').width();
                $(element).find('.display-value').css({ "max-width": width - 50 });
                $(element).find('.display-value').css({ "min-width": width - 50 });
                $(element).find('.dropdown-menu').width(width);
            });

            $scope.OnTextSearckKeyDown = function (evt) {
                if (evt.keyCode == 13) {
                    evt.preventDefault();
                    if (IsInit == true) {
                        $scope.Refresh(true);
                    }
                    if (!$(element).find('.input-group').hasClass('open')) {
                        $(element).find('.dropdown-toggle').trigger('click.bs.dropdown');
                    }
                }
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
        templateUrl: '../Templates/JSLookup.tpl.html'
           
    };
}]);

