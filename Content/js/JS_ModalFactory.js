app.factory('JsModalFactory', ['$uibModal', '$q', 'JSDataService', '$timeout', function ($uibModal, $q, JSDataService, $timeout) {

    var JsModalFactory = { };

    JsModalFactory.Modal = function (ID,ID_ViewType,ID_CurrentObject,ViewName , Mode ) {

        var defer = $q.defer();

        var Data = {
            ID: ID,
            ID_ViewType: ID_ViewType,
            ViewName: ViewName
        };

        JSDataService.GetCurrentObject('/JsApp/GetModelView', Data).then(function (View) {

            var templateUri = null;
            var loadController = null;
            var _loadCurrentObject = null;

            switch (ID_ViewType) {
                case 1:
                    templateUri = '/ListView?ID=' + ID + "&ViewName=" + View.Name + "&IsModal=1";
                    loadController = ['$q',function ($q) {
                        var deffered = $q.defer();
                        $timeout(function () {
                            require(['/JsApp/ListView?ID=' + ID + "&ViewName=" + View.Name + "&IsModal=1"], function () {
                                deffered.resolve();
                            });
                        }, 500);
                        return deffered.promise;
                    }];
                    break;
                case 2:
                    if (ID_CurrentObject == null) ID_CurrentObject = -1;
                    templateUri = '/DetailView?ID=' + ID + "&ViewName=" + View.Name + "&IsModal=1";
                    loadController = ['$q', function ($q) {
                        var deffered = $q.defer();
                        $timeout(function () {
                            require(['/JsApp/DetailView?ID=' + ID + "&ViewName=" + View.Name], function () {
                                deffered.resolve();
                            });
                        }, 500);
                        return deffered.promise;
                    }];
                    _loadCurrentObject = ['$q', function ($q) {
                        var deffered = $q.defer();
                        JSDataService.GetCurrentObject('/JsApp/GetCurrentObject', {
                              ID: ID
                            , ViewName: View.Name
                            , ID_CurrentObject: ID_CurrentObject
                        }).then(function (CurrentObject) {
                            deffered.resolve(CurrentObject);
                        });
                        return deffered.promise;
                    }];
                    break;
            }
            
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: templateUri,
                controller: View.ViewControllerName,
                windowTopClass: ID_ViewType == 1 ? 'js-listview-modal' : 'js-detailview-modal',
                backdrop: 'static',
                dialogWidth: View.Width,
                resolve: {
                    LoadController: loadController,
                    ViewStateName: function () {
                        return View.Name;
                    },
                    IsModal: function () {
                        return true;
                    },
                    CurrentObject: _loadCurrentObject,
                    ModalMode: function () {
                        return Mode;
                    }
                }
            });

            modalInstance.result.then(function (CurrentObject) {
                defer.resolve(CurrentObject);
            }, function () {
                defer.reject();
            });

        });

        return defer.promise;
    }
    return JsModalFactory;
}]);