app.config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('loadingStatusInterceptor');
    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
}])
.directive('loadingStatusMessage', ['JsPopUpView', function (JsPopUpView) {
    return {
        restrict: 'C',
        link: function ($scope, $element, attrs) {
            var show = function () {
                $element.css('display', 'flex');
            };
            var hide = function () {
                $element.css('display', 'none');
            };
            $scope.$on('loadingStatusActive', show);
            $scope.$on('loadingStatusInactive', hide);
            $scope.$on('HttpStatusResponseError', function (event, data) {
                //alert(data.message);
                if (data != null) {
                    if (data.SessionExpired != undefined) {
                        //console.log("Session Expired");
                        return;
                    }
                    if (data != undefined) {
                        //console.log("error",data.message);
                    } else {
                        //console.log("error", 'Ooops!! Something went wrong');
                    }
                }
            });
            $scope.$on('HttpStatusValidationError', function (event, data) {
                alert(data.message);
                //toastr.error(data.message, 'error');
                //console.log(data.message);
            });
            hide();
        }
    };
}])
.factory('loadingStatusInterceptor', ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {
    var IS_DEBUG_MODE = true;
    var timeOutShow = null;
    var timeOutHide = null;
    var activeRequests = 0;
    var started = function (showProgress) {
        activeRequests++;
        if (activeRequests > 0) {
            if (timeOutShow == null) {
                timeOutShow = $timeout(function () {
                    if (activeRequests > 0) {
                        if (showProgress) {
                            $rootScope.$broadcast('loadingStatusActive');
                        }
                    }
                }, 300);

            }
        };
    }
    var ended = function () {
        activeRequests--;
        if (timeOutShow != null) {
            $timeout(function () {
                if (activeRequests == 0) {
                    $rootScope.$broadcast('loadingStatusInactive');
                    $timeout.cancel(timeOutShow);
                    timeOutShow = null;
                }
            }, 300);
        }
    };
        return {
            request: function (config) {
                if (config.method == "GET") config.showProgress = false;
                if (config.showProgress !== undefined) {
                    if (config.showProgress === false) {
                        started(false);
                    } else {
                        started(true);
                    }
                } else {
                    started(true);
                }
                config.timeout = 1 * 180 * 1000; //2 Minutes
                return config || $q.when(config);
            },
            response: function (response) {
                //console.log(response); 
                ended();
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                //console.log(rejection);
                //console.log('--->',rejection.data.message);
                if (rejection.status == 599) {
                    if (rejection.data.message.includes('JavaScriptSerializer')) {
                        DevExpress.ui.dialog.alert("Unable to export. The data can be exported reach its limit.", 'Error');
                    } else {
                        alert(rejection.data.message);
                    }
                } else if (rejection.status == 600) {
                    var Popup = angular.element(document).injector().get('JsPopUpView');
                    Popup.ShowSessionTimeout();
                } else if (rejection.status == 601) {
                    //validation;
                    DevExpress.ui.dialog.alert(rejection.data.message, 'Validation');
                    //JsPopUpView.MsgBox(rejection.data.message, 'Validation');
                } else {
                    //JsPopUpView.EMsgBox(rejection.data.message, 'Error');
                    DevExpress.ui.dialog.alert(rejection.data.message, 'Error');
                }
                ended();
                return $q.reject(rejection);
            }
        };
    }
]);