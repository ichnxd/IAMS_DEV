'use strict';

app.controller('LoginController', ['$scope', '$http', '$location', 'JsPopUpView', 'JSDataService', 'JsWizardView', 'CacheFactory', function ($scope, $http, $location, JsPopUpView, JSDataService, JsWizardView, CacheFactory) {

    var JsLoginCache = CacheFactory('$JSLoginCache', {
        cacheFlushInterval: 60 * 60 * 1000,
        deleteOnExpire: 'aggressive',
        storageMode: 'localStorage'

    });
    var LastLogin = JsLoginCache.get('/LastUserLogin');
    $scope.LoginModel = {
        Username: LastLogin !== undefined ? LastLogin.Username : null,
        Password: null,
        ID_Company: -1
    };

    var FormLogin = null;

    var OnSubmitButton = function OnSubmitButton() {

        var result = FormLogin.validate();
        if (result.isValid === false) {
            return;
        }

        var req = {
            method: 'POST',
            url: '/Login/SignIn',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function transformRequest(obj) {
                var str = [];
                for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: $scope.LoginModel
        };

        $http(req).then(function (obj) {
            var data = JSON.parse(obj.data);
            if (data.Status == -1) {
                JsPopUpView.MsgBox(data.Message, 'Login');
                return;
            }
            if (data.IsChangePasswordUponFirstLogin === true) {
                data.HasPassword = false;
                JsWizardView.$changePasswordDialog(data).then(function () {
                    window.location.replace('/Home');
                });
                return;
            }

            JsLoginCache.put('/LastUserLogin', {
                Username: $scope.LoginModel.Username
            });

            window.location.replace('/Home');
        }, function (data) {});
    };

    $scope.buttonLogin = {
        text: 'Login',
        onClick: OnSubmitButton
    };

    $scope.Companies = [{
        ID: -1,
        Name: 'All Companies'
    }];

    $scope.FormOptions = {
        bindingOptions: {
            'formData.Username': 'LoginModel.Username',
            'formData.Password': 'LoginModel.Password'
        },
        //'formData.ID_Company': 'LoginModel.ID_Company',
        formData: $scope.LoginModel,
        showColonAfterLabel: false,
        onEditorEnterKey: function onEditorEnterKey() {
            OnSubmitButton();
        },
        onInitialized: function onInitialized(e) {
            FormLogin = e.component;
        },
        items: [{
            dataField: 'Username',
            validationRules: [{
                type: 'required',
                message: 'Username is required'
            }],
            label: {
                visible: false
            },
            editorOptions: {
                placeholder: 'Username',
                showClearButton: true,
                onValueChanged: function onValueChanged() {}
            }
        }, {
            dataField: 'Password',
            label: {
                visible: false
            },
            editorOptions: {
                mode: 'password',
                placeholder: 'Password',
                showClearButton: true,
                onValueChanged: function onValueChanged() {}

            }

        }]
    };
}]);

//{
//    dataField: 'ID_Company',
//    label: {
//        visible: false
//    },
//    editorType: 'dxSelectBox',
//    editorOptions: {
//        bindingOptions : {
//            'dataSource': 'Companies'
//        },
//        valueExpr: 'ID',
//        displayExpr: 'Name',
//        placeholder: 'Select Company',
//        onInitialized: function (e) {

//            JSDataService.GetDataSet('Login/GetCompanies').then(function (data) {

//                $.each(data.collection, function (i, c) {

//                    $scope.Companies.push(c);

//                });

//                e.component.option('dataSource', $scope.Companies);

//                e.component.repaint();

//            });

//        }
//    }
//}

