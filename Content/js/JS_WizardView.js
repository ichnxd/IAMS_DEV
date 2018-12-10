function JsWizardView($uibModal, $q, JSDataService, $timeout, $interpolate, $rootScope, $controller, $compile) {

    var JsWizardView = {};

    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    JsWizardView.Show = function (option) {

        var defer = $q.defer();

        //if (option.ViewSrc === undefined) {
        //    throw Error("View Src not defined");
        //}

        if (option.InitController === undefined) {
            throw Error("InitController not defined");
        }

        var popupID = generateUUID();

        var Template = $("<div id='" + popupID + "' class='JsCustomModal'></div>");

        if (option.cssClass !== undefined) {
            Template.addClass(option.cssClass);
        }

        $('body').append(Template);

        var wHeight = $(window).height();

        var wWidth = $(window).width();
        var _popUp = null;

        $('#' + popupID).dxPopup({
            title: option.title,
            width:  option.fullScreen === true ? undefined : ( option.width === undefined ? wWidth * 0.60 : option.width ),
            height: option.fullScreen === true ? undefined :  ( option.height === undefined ? wHeight * 0.60 : option.height),
            closeOnOutsideClick: option.closeOnOutsideClick !== undefined ? option.closeOnOutsideClick : false,
            showCloseButton: option.showCloseButton === undefined ? true : option.showCloseButton,
            animation: false,
            fullScreen: option.fullScreen,
            closeOnConfirm : option.closeOnConfirm === undefined ? true : option.closeOnConfirm,
            onHidden: function (e) {
                $timeout(function () {
                    if (option.closeOnConfirm === false) {
                        defer.resolve();
                    }
                    $("#" + popupID).remove();
                }, 500);
            },
            onInitialized: function (e) {
                _popUp = e.component;
                if (option.onPopupInitialized !== undefined) option.onPopupInitialized(_popUp);
            },
            contentTemplate: function (e) {

                var NewScope = $rootScope.$new();

                var html = '';
                if (option.ViewSrc !== undefined) {
                    NewScope.ViewSrc = option.ViewSrc;
                    html = '<div class="Content" style="overflow:auto;height:100%;padding-bottom:41px"><div ng-include="ViewSrc" style="height:100%"></div>';
                } else {
                    html = '<div class="Content" style="overflow:auto;height:100%;padding-bottom:41px">' + option.Template;
                }
                

                NewScope.NegativeButton = {
                    text: 'CANCEL',
                    icon: 'red mdi mdi-information-outline',
                    width: 120,
                    onClick: function () {
                        if (NewScope.onNegativeClick != undefined) {
                            NewScope.onNegativeClick(PopUp);
                        }
                        PopUp.hide();
                        defer.reject();
                    }
                }

                NewScope.PositiveButton = {
                    text: 'OK',
                    type: 'default',
                    width:120,
                    icon: 'mdi mdi-checkbox-marked-circle-outline',
                    onClick: function () {
                        if (NewScope.onPositiveClick != undefined) {
                            NewScope.onPositiveClick(PopUp);
                        }
                        //console.log('closeOnConfirm', option.closeOnConfirm);
                        if (option.closeOnConfirm === true) {
                            PopUp.hide();
                            defer.resolve();
                        }
                    }
                }

                option.InitController(NewScope);
                
                html = html + '</div>';

                html = html + '<div class="navigator-buttons" style="bottom:5px;position:absolute;right:0">';

                if (option.showPositiveButton !== false) {
                    html = html + '<div dx-button="PositiveButton"></div>';
                }

                if (option.showNegativeButton !== false) {
                    html = html + '<div dx-button="NegativeButton"></div>';
                }

                html = html + '</div>';
                var contentTemplate = $(html);
                return $compile(contentTemplate)(NewScope);
            }
        });

        var PopUp = $("#" + popupID).dxPopup('instance');

        PopUp.show();

        return defer.promise;
    }
    
    JsWizardView.EditCommentDialog = function (d) {
        //
        //
        //

        JsWizardView.Show({
            Template: '<div dx-text-area="dxTextAreaOption" style="font-size:18px;"></div>',
            title: 'Message',
            width: 450,
            closeOnConfirm: false,
            InitController: function (s) {
                s.Comment = null;
                s.dxTextAreaOption = {
                    bindingOptions: {
                        'value': 'Comment'
                    },
                    maxLength: 300,
                    height: '100%'
                }
                s.onPositiveClick = function (d) {
                    if (VC.IsEmptyString(s.Reason) === true) {
                        VC.MsgBox('Message is required.');
                        return;
                    }
                    var CurrentObject = VC.$scope.CurrentObject;
                    app.$GetDataService().pGetCurrentObject('@Html.EncryptSQL("pSendApprovalToRequestor")', {
                        ID_CurrentObject: CurrentObject.ID,
                        ID_Model: VC.ID_Model,
                        Message: s.Reason
                    }).then(function () {
                        d.hide();
                        _.VC.setFormReadOnly(true);
                        _.VC.Reload();

                    });
                }
            }
        });
    };

    JsWizardView.$changePasswordDialog = function (CurrentUser) {
        return JsWizardView.Show({
            ViewSrc: 'Templates/ChangePassword.tpl.html',
            title: 'Reset Password',
            width: 550,
            height: 250,
            closeOnConfirm: false,
            InitController: function ($scope) {

                var Form = null;

                $scope.CurrentObject = {
                    ID: CurrentUser.ID,
                    CurrentPassword: null,
                    NewPassword: null,
                    ConfirmPassword: null,
                };

                $scope.dxFormOption = {
                    bindingOptions: {
                        'formData.CurrentPassword': 'CurrentObject.CurrentPassword',
                        'formData.NewPassword': 'CurrentObject.NewPassword',
                        'formData.ConfirmPassword': 'CurrentObject.ConfirmPassword',
                    },
                    formData: $scope.CurrentObject,
                    labelLocation: 'top',
                    items: [
                       {
                           dataField: 'CurrentPassword',
                           editorType: 'dxTextBox',
                           isRequired: false,
                           label: {
                               showColon: false,
                               alignment: 'left'
                           },
                           editorOptions: {
                               mode: 'password',
                           },
                           visible: false
                       },
                       {
                           dataField: 'NewPassword',
                           editorType: 'dxTextBox',
                           isRequired: true,
                           label: {
                               showColon: false,
                               alignment: 'left'
                           },
                           editorOptions: {
                               mode: 'password',
                           }
                       },
                       {
                           dataField: 'ConfirmPassword',
                           editorType: 'dxTextBox',
                           isRequired: true,
                           label: {
                               showColon: false,
                               alignment: 'left'
                           },
                           editorOptions: {
                               mode: 'password'
                           }
                       }
                    ],
                    onInitialized: function (e) {
                        Form = e.component;
                    }
                };

                $scope.onPositiveClick = function (popup) {
                    var result = DevExpress.validationEngine.validateGroup(Form);

                    if (result.isValid == false) return;

                    if ($scope.CurrentObject.NewPassword !== $scope.CurrentObject.ConfirmPassword) {
                        alert('Password not match');
                        return false;
                    }

                    JSDataService.Post('JsApp/ChangeUserPassword', {
                        data: JSDataService.Base64.encode(JSON.stringify($scope.CurrentObject))
                    }).then(function () {
                        popup.hide();
                    });

                }

            }
        });
        //return $q.promise;
    }
    

    return JsWizardView;
}

app.factory('JsWizardView', ['$uibModal', '$q', 'JSDataService', '$timeout', '$interpolate', '$rootScope', '$controller', '$compile', JsWizardView]);