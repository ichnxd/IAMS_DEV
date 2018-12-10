"use strict";

define(['app'], function (app) {
    "use strict";
    function BaseViewController() {}

    function getRandomInt() {
        var min = 1000,
            max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
        return uuid;
    };

    BaseViewController.getRandomInt = getRandomInt;

    BaseViewController.$NewID = generateUUID;

    //
    //
    //

    //Init
    BaseViewController.prototype.Init = function ($scope, CurrentObject, ViewStateName, IsModal, ModalMode, isLoadBaseMenu) {

        var _ = this;

        _.IsEmptyString = function (s) {
            if (s === undefined || s === null) return true;
            if (s.replace(' ', '').length === 0) return true;
            return false;
        };

        _.JSDataService = angular.element(document).injector().get('JSDataService');
        _.JsPopUpView = angular.element(document).injector().get('JsPopUpView');
        _.$q = angular.element(document).injector().get('$q');
        _.$timeout = angular.element(document).injector().get('$timeout');
        //_.CurrentUser = angular.element(document).injector().get('$rootScope').CurrentUser;

        if ($scope.$Tab != undefined) {

            $scope.$Tab.IssueTracker = function (id) {
                _.OpenIssueTracker(id);
            };

            if ($scope.$Tab.ID_View !== undefined) _.ID_View = $scope.$Tab.ID_View;
        }

        _.CurrentUser = $scope.$CurrentUser;

        _.calculateHeaderExpression = function (property, expression, type) {

            var headerObjectMatches = expression.match(/(\#\S+\b)/ig);

            if (headerObjectMatches != null) {

                $.each(headerObjectMatches, function (i, s) {

                    var Value = null;
                    if (s.includes('.')) {

                        Value = _.$scope.CurrentObject[s.replace('#', '').split('.')[0]];

                        if (Value == null) Value = [];

                        expression = expression.replace(s.split('.')[0], JSON.stringify(Value));
                    } else {

                        Value = _.$scope.CurrentObject[s.substring(1, s.length)];

                        if (Value !== null && Value !== undefined) {
                            if (typeof Value === 'string' || Value instanceof String) {
                                Value = "\"" + Value + "\"";
                            }
                        } else {
                            if (type == 1) {
                                Value = "\"\"";
                            }
                        }

                        expression = expression.replace(s, Value);
                    }
                });
            }

            if (type == 1) {
                var Value = eval(expression);
                _.$scope.CurrentObject[property] = Value;
                return;
            }

            var Value = eval(expression);
            _.$scope.CurrentObject[property] = isNaN(Value) ? type == 4 || type == 5 ? 0.00 : '' : Value;
        };

        _.ExpressionValue = function (property, expression, type) {

            var headerObjectMatches = expression.match(/(\#\S+\b)/ig);

            if (headerObjectMatches != null) {

                $.each(headerObjectMatches, function (i, s) {

                    var Value = null;
                    if (s.includes('.')) {

                        Value = _.$scope.CurrentObject[s.replace('#', '').split('.')[0]];

                        if (Value == null) Value = [];

                        expression = expression.replace(s.split('.')[0], JSON.stringify(Value));
                    } else {

                        Value = _.$scope.CurrentObject[s.substring(1, s.length)];

                        if (Value !== null && Value !== undefined) {
                            if (typeof Value === 'string' || Value instanceof String) {
                                Value = "\"" + Value + "\"";
                            }
                        } else {
                            if (type == 1) {
                                Value = "\"\"";
                            }
                        }

                        expression = expression.replace(s, Value);
                    }
                });
            }

            return Value;
        };

        _.calculateExpression = function (data, expression, propertyName, type, rowIndex) {

            //console.log(rowIndex);
            //console.log(propertyName, expression);

            var objectMatches = expression.match(/(\@\S+\b)/ig);

            var headerObjectMatches = expression.match(/(\#\S+\b)/ig);

            var PropertyAliasObjectMatches = expression.match(/(\!\S+\b)/ig);

            var HeaderPropertyAliasObjectMatches = expression.match(/(\$\S+\b)/ig);

            if (objectMatches != null) {
                $.each(objectMatches, function (i, s) {
                    var value = data[s.substring(1, s.length)];
                    //console.log(data);
                    //console.log(s.substring(1, s.length));
                    //console.log(value);
                    //if (typeof value == 'string') value = "'" + value + "'";
                    expression = expression.replace(s, value);
                });
            }

            if (headerObjectMatches != null) {
                $.each(headerObjectMatches, function (i, s) {
                    var value = _.$scope.CurrentObject[s.substring(1, s.length)];
                    //if (typeof value == 'string') value = "'" + value + "'";
                    console.log('Current Object', _.$scope.CurrentObject);
                    expression = expression.replace(s, value);
                });
            }

            if (PropertyAliasObjectMatches != null) {
                //console.log('PROPERTY NAME', propertyName);
                //console.log('ROW INDEX', rowIndex);

                var arrayList = _.$scope.CurrentObject[propertyName];

                $.each(PropertyAliasObjectMatches, function (i, s) {

                    var data = arrayList[rowIndex];

                    var value = null;
                    if (data != undefined) {
                        var propertyName = s.substring(1, s.length).split(".")[0];
                        var _data = data['EXPR_' + propertyName];
                        value = _data !== null && _data !== undefined ? _data[s.substring(1, s.length).split(".")[1]] : null;
                        //if (typeof value == 'string') value = "'" + value + "'";
                    }
                    expression = expression.replace(s, value);
                    console.log('Express Value-->', value);
                });
            }

            if (HeaderPropertyAliasObjectMatches != null) {
                $.each(HeaderPropertyAliasObjectMatches, function (i, s) {
                    var value = _.$scope.CurrentObject['EXPR_' + s.substring(1, s.length)];
                    // if (typeof value == 'string') value = "'" + value + "'";
                    expression = expression.replace(s, value);
                    console.log('Expression', s);
                });
            }

            var Value = '';

            if (type == 4 || type == 5) {
                Value = eval(expression);
            } else {
                Value = eval('"' + expression + '"');
            }
            //if (typeof expression === "string") {
            //    Value = eval('"' + expression + '"');
            //} else {
            //    Value = eval(expression);
            //}
            return isNaN(Value) ? type == 4 || type == 5 ? 0.00 : Value : Value;
        };

        _.Query = function (SQL, Options) {
            var d = _.$q.defer();

            if (Options == null) Options = {};

            _.JSDataService.Query(SQL, Options).then(function (Data) {

                d.resolve(Data.collection);
            });

            return d.promise;
        };

        _.BrowseDataSet = function (SQL, Options) {

            var d = _.$q.defer();

            if (Options == null) Options = {};

            _.JsPopUpView.BrowseDataSet(SQL, Options).then(function (SelectedRows) {

                d.resolve(SelectedRows);
            });

            return d.promise;
        };

        _.MsgBox = function (message, title, options) {
            if (title == undefined) title = _.DisplayName;
            return DevExpress.ui.dialog.alert(message, title);
            //return this.JsPopUpView.MsgBox(message, title, options);
        };

        _.CustomBox = function (dialogOptions) {
            var myDialog = DevExpress.ui.dialog.custom(dialogOptions);
            return myDialog.show();
        };

        //_.ErrMsgBox = function (message, title, options) {
        //    if (title == undefined) title = "ITI Web Accounting";
        //    return this.JsPopUpView.EMsgBox(message, title, options);

        //}

        //_.ScMsgBox = function (message, title, options) {
        //    if (title == undefined) title = "ITI Web Accounting";
        //    return this.JsPopUpView.SMsgBox(message, title, options);
        //}

        //_.WarnMsgBox = function (message, title, options) {
        //    if (title == undefined) title = "ITI Web Accounting";
        //    return this.JsPopUpView.WMsgBox(message, title, options);
        //}

        _.ConfirmBox = function (message, title) {
            var defer = _.$q.defer();
            if (title == undefined || title == null) title = _.DisplayName;
            DevExpress.ui.dialog.confirm(message, title).done(function (dialogResult) {
                if (dialogResult) {
                    defer.resolve();
                } else {
                    defer.reject();
                }
            });
            return defer.promise;
        };

        var toastr = angular.element(document).injector().get('toastr');
        var ToastTimeOut = 3000;

        _.ToastInfo = function (message, timeOut) {
            if (timeOut === undefined) timeOut = ToastTimeOut;
            //toastr.info(message, _.DisplayName, {
            //    closeButton: true
            //});

            DevExpress.ui.notify(message, 'info', timeOut);
        };

        _.ToastError = function (message) {

            toastr.error(message, _.DisplayName, {
                closeButton: true
            });

            //DevExpress.ui.notify(message, 'error', ToastTimeOut);
        };

        _.ToastWarning = function (message) {
            toastr.warning(message, _.DisplayName, {
                closeButton: true
            });
            //DevExpress.ui.notify(message, 'warning', ToastTimeOut);
        };

        _.ToastSuccess = function (message) {
            //toastr.success(message, _.DisplayName, {
            //    closeButton: true
            //});
            DevExpress.ui.notify({
                message: message,
                type: 'success',
                shading: true,
                position: {
                    my: 'bottom right', at: 'bottom right', of: window, offset: '-10, -10'
                },
                width: $(window).width() * 0.25,
                displayTime: 1000
            });
        };

        _.EditOnSQLView = function ($ID_ViewType, $ID_View, ID_Tab) {

            var $rootScope = angular.element(document).injector().get('$rootScope');

            $rootScope.$emit("CallNewTabMethod", {

                ID: getRandomInt(),
                Caption: 'SQL VIEW',
                ID_ViewType: 5,
                ViewID: 3350,
                params: {
                    ID_ViewType: $ID_ViewType,
                    ID_View: $ID_View,
                    ID_Tab: ID_Tab
                }
            });
        };

        _.EditModelOnSQLView = function ($ID_Model) {

            var $rootScope = angular.element(document).injector().get('$rootScope');

            $rootScope.$emit("CallNewTabMethod", {

                ID: getRandomInt(),
                Caption: 'SQL VIEW',
                ID_ViewType: 5,
                ViewID: 3350,
                params: {
                    ID_ViewType: -1,
                    ID_Model: $ID_Model
                }
            });
        };

        _.OpenOnNewTab = function (data) {
            var $rootScope = app.$rootScope();
            $rootScope.$emit("CallNewTabMethod", {
                ID: app.getRandomInt(),
                Caption: data.Caption == undefined ? "New" : data.Caption,
                ID_ViewType: 2,
                ViewID: data.ID_View,
                ImageName: data.ImageName === undefined ? 'mdi mdi-file-outline' : data.ImageName,
                ID_CurrentObject: data.ID_CurrentObject !== undefined ? data.ID_CurrentObject : -1,
                params: data.params
            });
        };

        _.OpenOnNewWindow = function (ID_DetailView, Data) {
            var defer = _.$q.defer();
            var Options = {
                CurrentObject: Data,
                OnEditingDone: function OnEditingDone(editData) {
                    if (Data !== undefined) {
                        defer.resolve(editData);
                    }
                },
                fullScreen: false
            };
            if (_.$onOpenDetailView !== undefined) {
                _.$onOpenDetailView(ID_DetailView, Data.ID, Options);
            }
            this.JsPopUpView.OpenDetailView(ID_DetailView, Options);
            return defer.promise;
        };

        _.OpenOnNewWindowByID = function (ID_DetailView, ID_CurrentObject, option) {
            var defer = _.$q.defer();
            var Options = $.extend({
                ID_CurrentObject: ID_CurrentObject,
                OnEditingDone: function OnEditingDone(editData) {
                    defer.resolve(editData);
                }, fullScreen: option == undefined ? false : option.fullScreen
            }, option);
            if (_.$onOpenDetailView !== undefined) {
                _.$onOpenDetailView(ID_DetailView, ID_CurrentObject, Options);
            }
            this.JsPopUpView.OpenDetailView(ID_DetailView, Options);
            return defer.promise;
        };

        _.ViewReport = function (ID, ID_Report, Caption, Params) {

            var $rootScope = angular.element(document).injector().get('$rootScope');

            $rootScope.$emit("CallNewTabMethod", {

                ID: ID * 1000010 * (ID_Report !== undefined ? ID_Report : 1),
                Caption: Caption,
                ID_ViewType: 3,
                ID_Report: ID_Report,
                params: Params

            });
        };

        _.openModelListView = function (ID_Tab, ID_View) {
            var $rootScope = angular.element(document).injector().get('$rootScope');
            $rootScope.$emit("CallNewTabMethod", {
                ID: ID_Tab,
                Caption: _.DisplayName,
                ID_ViewType: 1,
                ViewID: ID_View
            });
        };

        _.OpenIssueTracker = function (id) {
            var $rootScope = angular.element(document).injector().get('$rootScope');
            $rootScope.$emit("CallNewTabMethod", {
                ID: getRandomInt(),
                Caption: id === 5 ? 'Report a Bug' : 'Suggestion',
                ID_ViewType: 2,
                ViewID: 4140,
                params: {
                    ID_IssueTrackerType: id === 5 ? 3 : 1,
                    ID_Model: _.ID_Model,
                    ID_View: _.ID_View
                }
            });
        };

        _.RefreshToolBar = function () {
            _.MainToolbar.repaint();
        };

        _.console_warn = function (message) {
            console.log('%c ' + message, 'color: #bada55');
        };

        _.SaveListViewFormat = function (ModelViewName, GridState, ID_ModelObject) {

            DevExpress.ui.dialog.confirm("Save ListViewState ?", "Save " + ModelViewName).done(function (dialogResult) {
                if (dialogResult) {

                    _.JSDataService.SaveListViewFormat(GridState, ID_ModelObject).then(function () {

                        DevExpress.ui.notify('Layout Save.', 'success', 1000);
                    });
                }
            });
        };

        _.DeleteModelObjects = function (items) {
            if (items.length === 0) return;
            var defer = _.$q.defer();
            DevExpress.ui.dialog.confirm("Delete Items?", _.ModelName).done(function (dialogResult) {
                if (dialogResult) {

                    _.JSDataService.DeleteObjects(items, _.ID_Model).then(function (response) {

                        //console.log(response);
                        var CurrentObject = JSON.parse(response.data);
                        if (CurrentObject.IsError != undefined) {
                            if (CurrentObject.IsError == true) {
                                if (CurrentObject.ErrorCode === 547) {
                                    console.log(CurrentObject.Message);
                                    DevExpress.ui.dialog.alert('Unable to delete ' + (_.DisplayName !== undefined && _.DisplayName !== null ? _.DisplayName : 'object') + '. ' + (_.DisplayName !== undefined && _.DisplayName !== null ? _.DisplayName : 'object') + ' already reference.', 'IAMS');
                                } else {
                                    DevExpress.ui.dialog.alert(CurrentObject.Message, 'Error');
                                }
                                return;
                            }
                        }

                        DevExpress.ui.notify('Delete Successfully.', 'success', 1000);
                        defer.resolve(response);
                    }, function () {});
                }
            });
            return defer.promise;
        };

        //
        //  CELL TEMPLATE
        //

        _.InitEditCellTemplate_SelectBox = function (cellElement, cellInfo, col) {
            $('<div></div>').cmSelectBox({

                dataSource: col.DataSource,
                displayExpr: 'Name',
                valueExpr: 'ID',
                value: cellInfo.data[col.Name],
                showClearButton: true,
                onInitialized: function onInitialized(e) {
                    if (cellInfo.data[col.Name] == null || cellInfo.data[col.Name] === undefined) {
                        _.$timeout(function () {
                            e.component.option('opened', true);
                        }, 500);
                    }
                },
                onValueChanged: function onValueChanged(e) {
                    if (e.value == null) {
                        cellInfo.setValue(null);
                    } else {
                        cellInfo.setValue(e.value);
                    }
                    cellInfo.component.saveEditData();
                },
                onDisposing: function onDisposing(e) {

                    var ItemSelected = e.component.option('selectedItem');

                    cellInfo.data['EXPR_' + col.PropertyAlias] = ItemSelected;

                    cellInfo.data[col.DisplayProperty] = ItemSelected !== null ? ItemSelected.Name : '';

                    cellInfo.data[col.Name] = ItemSelected !== null ? ItemSelected.ID : null;

                    if (cellInfo.data.ID != (ItemSelected != null ? ItemSelected.ID : null)) {

                        if (_[col.ListViewPropertyName + '_onColumnChanged'] !== undefined) {

                            _[col.ListViewPropertyName + '_onColumnChanged'].call(this, {
                                data: ItemSelected,
                                dataField: col.Name,
                                key: cellInfo.data,
                                grid: cellInfo.component

                            });
                        }

                        cellInfo.component.saveEditData();
                    }
                }
            }).appendTo(cellElement);
        };

        _.InitEditCellTemplate_LU = function (cellElement, cellInfo, col) {

            var CurrentValue = null;

            if (cellInfo.data[col.Name] !== undefined && cellInfo.data[col.Name] !== null) {
                CurrentValue = {
                    ID: cellInfo.data[col.Name],
                    Name: cellInfo.data[col.DisplayProperty]
                };
            }

            cellInfo.data['EXPR_' + col.PropertyAlias] = CurrentValue;

            if (col.DisplayProperty == null) {
                col.DisplayProperty = 'Name';
            }

            $('<div></div>').jDxSelectBox({
                _CurrentValue: CurrentValue,
                JsPopUpView: _.JsPopUpView,
                ID_ModelListView: col.ID_ModelListView,
                modelPrimaryColor: col.ModelPropertyPrimaryColor,
                icon: col.ModelPropertyIcon,
                editCellInfo: cellInfo,
                isEnterKey: false,
                //Grid: cellInfo.component,
                OnItemSelected: function OnItemSelected(e) {

                    cellInfo.data['EXPR_' + col.PropertyAlias] = e;

                    cellInfo.setValue(e.ID);

                    cellInfo.component.saveEditData();
                },
                onValueChanged: function onValueChanged(e) {

                    cellInfo.data['EXPR_' + col.PropertyAlias] = e.value;

                    if (e.value === null) {
                        cellInfo.setValue(null);
                    } else {
                        cellInfo.setValue(e.value.ID);
                    }
                },
                onDisposing: function onDisposing(e) {

                    var ItemSelected = e.component._options._CurrentValue;

                    cellInfo.data[col.DisplayProperty] = ItemSelected !== null ? ItemSelected.Name : '';

                    cellInfo.data[col.Name] = ItemSelected !== null ? ItemSelected.ID : null;

                    cellInfo.data['EXPR_' + col.PropertyAlias] = ItemSelected;

                    if (cellInfo.data.ID != (ItemSelected != null ? ItemSelected.ID : null)) {

                        cellInfo.component.saveEditData();

                        if (_[col.ListViewPropertyName + '_onColumnChanged'] !== undefined) {

                            _[col.ListViewPropertyName + '_onColumnChanged'].call(this, {
                                data: ItemSelected,
                                dataField: col.Name,
                                key: cellInfo.data,
                                grid: cellInfo.component,
                                rowIndex: cellInfo.rowIndex

                            });
                        }
                    }
                }
            }).appendTo(cellElement);
        };

        _.InitEditCellTemplate_LVBox = function (cellElement, cellInfo, col) {

            $('<div></div>').dxListViewBox({
                SQL: col.SQL,
                Columns: col.Columns,
                ColumnsFilter: col.ColumnsFilter,
                OnItemSelected: function OnItemSelected(e) {

                    cellInfo.setValue(e.ID);

                    cellInfo.data[col.DisplayProperty] = e !== null ? e.Name : '';

                    cellInfo.data[col.Name] = e !== null ? e.ID : null;

                    cellInfo.data['EXPR_' + col.PropertyAlias] = e;

                    _.$timeout(function () {

                        cellInfo.component.saveEditData();

                        if (_[col.ListViewPropertyName + '_onColumnChanged'] !== undefined) {

                            _[col.ListViewPropertyName + '_onColumnChanged'].call(this, {
                                data: e,
                                dataField: col.Name,
                                key: cellInfo.data,
                                grid: cellInfo.component,
                                rowIndex: cellInfo.rowIndex

                            });
                        }
                    });

                    //console.log('Current Object after edit', _.$scope.CurrentObject);
                },
                onInitialized: function onInitialized(e) {

                    _.HasdxListViewEditor_Open = true;

                    if (cellInfo.data[col.Name] != null) {

                        var _Values = [{ ID: cellInfo.data[col.Name], Name: cellInfo.data[col.DisplayProperty] }];

                        e.component.option('selectedItem', _Values[0]);

                        e.component.option('value', _Values[0].ID);

                        cellInfo.data['EXPR_' + col.PropertyAlias] = _Values[0];
                        //alert(col.Name);
                    } else {
                            _.$timeout(function () {
                                e.component.option('opened', true);
                            }, 500);
                        }
                },
                onLoad: function onLoad(data, component) {

                    if (data.params === null || data.params === undefined) data.params = {};

                    if (_[col.ListViewPropertyName + '_' + col.Name + '_onColumnDataSourceLoad'] !== undefined) {
                        _[col.ListViewPropertyName + '_' + col.Name + '_onColumnDataSourceLoad'](data, cellInfo.data);
                    }

                    //data.FilterExpr = null;
                    ////col.FilterExpr.match(/\(([^)]+)\)/g);

                    //if (col.FilterExpr != undefined) {

                    //    var objectMatches = col.FilterExpr.match(/(\@\S+\b)/ig);

                    //    var headerObjectMatches = col.FilterExpr.match(/(\#\S+\b)/ig);

                    //    if (objectMatches != null) {
                    //        $.each(objectMatches, function (i, s) {
                    //            var value = cellInfo.data[s.substring(1, s.length)];
                    //            data.params[s.substring(1, s.length)] = value == null ? "NULL" : (typeof value == String ? "'" + value + "'" : value);
                    //        });
                    //    }

                    //    if (headerObjectMatches != null) {
                    //        $.each(headerObjectMatches, function (i, s) {
                    //            var value = _.$scope.CurrentObject[s.substring(1, s.length)];
                    //            data.params[s.substring(1, s.length)] = value == null ? "NULL" : (typeof value == String ? "'" + value + "'" : value);
                    //        });
                    //    }
                    //    data.FilterExpr = col.FilterExpr;
                    //}

                    //console.log(data);
                },
                onDisposing: function onDisposing(e) {

                    _.HasdxListViewEditor_Open = false;

                    var value = e.component.option('value');
                    if (value == null) {
                        _.$timeout(function () {
                            cellInfo.data[col.DisplayProperty] = null;
                            cellInfo.data[col.Name] = null;
                            cellInfo.data['EXPR_' + col.PropertyAlias] = null;
                            cellInfo.component.saveEditData();
                            if (_[col.ListViewPropertyName + '_onColumnChanged'] !== undefined) {

                                _[col.ListViewPropertyName + '_onColumnChanged'].call(this, {
                                    data: null,
                                    dataField: col.Name,
                                    key: cellInfo.data,
                                    grid: cellInfo.component,
                                    rowIndex: cellInfo.rowIndex

                                });
                            }
                        });
                    }
                    //var ItemSelected = value != null ? Enumerable.From(e.component.option('items')).Where("$.ID == " + value).SingleOrDefault() : null;

                    //if (ItemSelected == undefined) ItemSelected = null;

                    //cellInfo.data[col.DisplayProperty] = ItemSelected !== null ? ItemSelected.Name : '';

                    //cellInfo.data[col.Name] = ItemSelected !== null ? ItemSelected.ID : null;
                }
            }).appendTo(cellElement);
        };

        //
        //  VALIDATION
        //

        _.ViewModelScript = function () {

            var $rootScope = angular.element(document).injector().get('$rootScope');

            $rootScope.$emit("CallNewTabMethod", {

                ID: getRandomInt(),
                Caption: 'Code Editor (' + _.ModelName + ')',
                ID_ViewType: 5,
                ViewID: 4642,
                params: {
                    ID_Model: _.ID_Model
                }
            });
        };
    };

    BaseViewController.prototype.ShowValidation = function (brokenRules) {

        //console.log('brokenRules',brokenRules);

        var _ = this;

        var ID = generateUUID();

        var Template = "<div id='" + ID + "' class='JsValidationPopup'></div>";
        $('body').append(Template);

        $("#" + ID).dxPopup({
            title: 'Validation',
            height: 270,
            width: 600,
            animation: false,
            onShown: function onShown(e) {

                //
                //
                //
                var c = e.component;
                $(c._$popupContent).attr('tabindex', -10000);
                $(c._$popupContent).keydown(function (evt) {
                    if (evt.keyCode === 13) {
                        //alert(13);
                        var PopUp = $("#" + ID).dxPopup('instance');
                        PopUp.hide();
                        //console.log(brokenRules);
                        var controls = Enumerable.From(brokenRules).Where('$.validator !== undefined').ToArray();
                        if (controls.length > 0) {
                            _.$timeout(function () {
                                controls[0].validator.focus();
                            }, 500);

                            //controls[0].validator.focus();
                        }
                    }
                });
                $(c._$popupContent).focus();

                var _brokenRules = brokenRules.reverse();
                c._$popupContent.css({ 'padding': '0px' });

                $('<div class="jsvalidationgrid"></div>').dxDataGrid({
                    dataSource: _brokenRules,
                    columns: [{ dataField: "message" }], //{dataField : "type" , width : 100},
                    showRowLines: true,
                    loadPanel: {
                        visible: false
                    },
                    height: 200,
                    onRowClick: function onRowClick(e) {
                        var PopUp = $("#" + ID).dxPopup('instance');
                        PopUp.hide();
                        _.$timeout(function () {
                            if (e.data.validator !== undefined) {
                                e.data.validator.focus();
                            }
                        });
                    },
                    focusStateEnabled: true,
                    showColumnLines: false,
                    tabIndex: -1000,
                    onKeyDown: function onKeyDown(evt) {
                        //alert('xx');
                    },
                    onInitialized: function onInitialized(evt) {
                        //_.$timeout(function () {
                        //    evt.component.focus();
                        //}, 1000);
                    }
                }).appendTo(c._$popupContent);

                $('<div class="button-ok"></div>').dxButton({

                    text: 'OK',
                    icon: 'mdi mdi-information-outline',
                    type: 'danger',
                    onClick: function onClick() {
                        var PopUp = $("#" + ID).dxPopup('instance');
                        PopUp.hide();
                        var data = Enumerable.From(brokenRules).Where('$.validator !== undefined').ToArray();
                        if (data.length > 0) {
                            _.$timeout(function () {
                                //alert('xxx');
                                data[0].validator.focus();
                            });
                        }
                    }
                }).appendTo(c._$popupContent);
            }, onHidden: function onHidden() {

                _.$timeout(function () {

                    $("#" + ID).remove();
                }, 500);
            }

        });

        var PopUp = $("#" + ID).dxPopup('instance');

        PopUp.show();
    };

    BaseViewController.prototype.ShowDataOnList = function (DataList, Title) {

        //console.log('brokenRules',brokenRules);
        var _ = this;

        var defer = _.$q.defer();

        var _ = this;

        var ID = generateUUID();

        var Template = "<div class='js-grid-container js-themes' id='" + ID + "'></div>";

        $('body').append(Template);

        $("#" + ID).dxPopup({
            title: Title,
            height: $(window).height() * 0.8,
            width: $(window).width() * 0.8,
            fullScreen: false,
            animation: false,

            onShown: function onShown(e) {

                //
                //
                //
                var c = e.component;

                c._$popupContent.css({ 'padding': '0px' });

                $('<div></div>').dxDataGrid({
                    dataSource: DataList,
                    columns: ["FileName", "DirectoryPath"],
                    showRowLines: true,
                    filterRow: {
                        visible: false
                    },
                    loadPanel: {
                        visible: false
                    },
                    scrolling: {
                        mode: 'virtual'
                    },
                    showColumnLines: false,
                    selection: {
                        mode: 'single'

                    }, searchPanel: {
                        visible: true
                    }, height: '100%',
                    onRowClick: function onRowClick(e) {

                        c.hide();

                        defer.resolve(e.data);
                    }

                }).appendTo(c._$popupContent);

                //$('<div class="button-ok"></div>').dxButton({

                //    text: 'OK',
                //    onClick: function () {

                //        var PopUp = $("#" + ID).dxPopup('instance');

                //        PopUp.hide();

                //    }

                //}).appendTo(c._$popupContent);
            }, onHidden: function onHidden() {

                _.$timeout(function () {

                    $("#" + ID).remove();
                }, 500);
            }

        });

        var PopUp = $("#" + ID).dxPopup('instance');

        PopUp.show();

        return defer.promise;
    };

    //
    //
    //

    BaseViewController.prototype.toggleWatch = function (watchExpr, fn) {
        var watchFn;
        var _ = this;
        return function () {
            if (watchFn) {
                watchFn();
                watchFn = undefined;
                //console.log("Disabled " + watchExpr);
            } else {
                    watchFn = _.$scope.$watchCollection(watchExpr, fn);
                    //console.log("Enabled " + watchExpr);
                }
        };
    };

    BaseViewController.prototype.ColumnValidator = function (value, callback) {
        var KeyObject = this.instance.view.settings.data[this.row];
        if (KeyObject == undefined) {
            callback(true);
            return;
        }
        if (KeyObject.ID !== null && KeyObject.ID !== undefined) {
            if (this.IsValidated(this, value) == false) {
                callback(false);
            } else {
                callback(true);
            }
        } else {
            callback(true);
        }
    };

    BaseViewController.prototype.InitDataGridView = function (ListView) {
        var _ = this;

        var PropertyName = ListView.PropertyName;
        var Columns = ListView.Columns;
        var _ContextMenuItems = {};

        if (_.IsDeveloperMode == true) {
            _ContextMenuItems["edit_listview"] = {
                name: "Edit ListView Model"
            };

            _ContextMenuItems["edit_control"] = {
                name: "Edit Control"
            };

            _ContextMenuItems["batch_edit_columns"] = {
                name: "Batch Edit Columns"
            };

            _ContextMenuItems["batch_edit_model_properties"] = {
                name: "Batch Edit Model Properties"
            };

            _ContextMenuItems["edit_column"] = {
                name: "Edit Current Column"
            };

            _ContextMenuItems["edit_property"] = {
                name: "Edit Property"
            };
        }

        _ContextMenuItems["delete"] = {
            name: "Delete"
        };

        _.$scope[ListView.Name] = {
            height: ListView.Height,
            //width: 600,
            invalidCellClassName: 'InvalidCell',
            listItemOption: ListView.ListItemOption,
            startRows: 1,
            wordWrap: false,
            columns: Columns,
            outsideClickDeselects: false,
            colHeaders: Enumerable.From(Columns).Select('$.caption').ToArray(),
            minSpareRows: 0,
            afterCreateRow: function afterCreateRow() {},
            beforeRender: function beforeRender() {
                if (_.$scope.CurrentObject[PropertyName] != null) {
                    $.each(_.$scope.CurrentObject[PropertyName], function (i, o) {
                        if (o.ID == null) o.ID == -1;
                    });
                }
            },
            contextMenu: {
                callback: function callback(key, options) {
                    var selected = this.getSelected();
                    var colCount = Columns.length;

                    var rowStartIndex = selected[0] < selected[2] || selected[0] == selected[2] ? selected[0] : selected[2];
                    var rowEndIndex = selected[0] < selected[2] || selected[0] == selected[2] ? selected[2] : selected[0];

                    var SelectedObjects = [];
                    if (colCount - 1 == selected[3]) {
                        for (var i = rowStartIndex; i <= rowEndIndex; i++) {
                            SelectedObjects.push(_.$scope.CurrentObject[PropertyName][i]);
                        }
                    }
                    switch (key) {
                        case "delete":
                            if (SelectedObjects.length == 0) return;
                            //
                            //
                            //
                            var Instance = this;
                            var result = DevExpress.ui.dialog.confirm("Are you sure ?", "Delete Item(s)");
                            result.done(function (dialogResult) {
                                var Values = _.$scope.CurrentObject[PropertyName];
                                $.each(Values, function (i, o) {
                                    if (o == undefined) return;
                                    if (o.$IsNewRow == true) return;
                                    $.each(SelectedObjects, function (x, p) {
                                        if (_.$scope.CurrentObject[PropertyName][i].ID === p.ID) {
                                            _.$scope.CurrentObject[PropertyName].splice(i, 1);
                                            if (p.ID > -1) {
                                                if (_._DeletedItems[PropertyName] == undefined) _._DeletedItems[PropertyName] = [];
                                                _._DeletedItems[PropertyName].push(o);
                                            }
                                        }
                                    });
                                });
                                Instance.render();
                            });
                            break;
                        case "edit_listview":
                            _.EditListViewControl(ListView.ID_ListView);
                            break;
                        case "edit_control":
                            _.EditModelDetail_Setting(ListView.ID_Control, ListView.Caption);
                            break;
                        case "batch_edit_columns":
                            _.EditOnSQLView(1, ListView.ID_ListView);
                            break;
                        case "batch_edit_model_properties":
                            _.EditModelOnSQLView(ListView.ID_ModelProperty);
                            break;
                        case "edit_column":
                            if (selected[1] == selected[3]) {
                                var CurrentColumn = Columns[selected[1]];
                                _.JsPopUpView.OpenDetailView(21, {
                                    ID_CurrentObject: CurrentColumn.ID_Column,
                                    fullScreen: true
                                });
                            }
                            break;
                        case "edit_property":
                            if (selected[1] == selected[3]) {
                                var CurrentColumn = Columns[selected[1]];
                                if (CurrentColumn.ID_ModelProperty == undefined) return;
                                _.JsPopUpView.OpenDetailView(15, {
                                    ID_CurrentObject: CurrentColumn.ID_ModelProperty,
                                    fullScreen: true
                                });
                            }

                            break;
                    }
                },
                items: _ContextMenuItems
            },
            rowHeaders: true,
            afterInit: function afterInit() {
                if (_.$HotTableList == null) {
                    _.$HotTableList = [];
                }
                _.$HotTableList.push(this);
                //ht_master handsontable

                //$watchCollection();
            },
            beforeKeyDown: function beforeKeyDown(e) {
                var startCol = this.getSelected()[1];
                var lastCol = this.getSelected()[3];
                var rowStartIndex = this.getSelected()[0];
                var rowLastIndex = this.getSelected()[2];
                var Column = this.view.settings.columns[startCol];
                if (Column.editor === 'dxListView' || Column.editor === 'dxSelectBox') {
                    if (e.keyCode == 46 || e.keyCode === 8) {
                        if (this.getActiveEditor()._opened == false) {
                            e.stopImmediatePropagation();
                            if (startCol == lastCol) {
                                for (var i = rowStartIndex; i <= rowLastIndex; i++) {
                                    var KeyObject = _.$scope.CurrentObject[PropertyName][i];
                                    KeyObject[Column.data] = null;
                                    if (Column.DisplayProperty != undefined) {
                                        KeyObject[Column.DisplayProperty] = null;
                                    }
                                    if (_[PropertyName + '_onColumnChanged'] !== undefined) {
                                        _[PropertyName + '_onColumnChanged'].call(this, {
                                            data: null,
                                            dataField: Column.data,
                                            key: KeyObject,
                                            grid: this,
                                            rowIndex: i
                                        });
                                    }
                                }
                            }
                            this.validateCells(function (p) {});
                            this.render();
                            return;
                        }
                    }
                    if (e.keyCode === 8 || e.keyCode === 13) {
                        if (this.getActiveEditor()._opened == false) {
                            return;
                        }
                        if (e.keyCode === 13) {}
                        e.stopImmediatePropagation();
                        return;
                    }
                }
                //_.OnKeyDown(e);
            },
            onListItem_Added: function onListItem_Added(List) {
                if (_.$scope.CurrentObject[PropertyName] == null) _.$scope.CurrentObject[PropertyName] = [];
                $.each(List, function (i, o) {
                    _.$scope.CurrentObject[PropertyName].push(o);
                });
            },
            afterLoadData: function afterLoadData(b) {
                if (_.$scope.CurrentObject[PropertyName] == null) _.$scope.CurrentObject[PropertyName] = [];
            },
            init: function init() {
                this.IsCanEdit = function (col, row, prop, cellProperties) {
                    return true;
                };
                var elem = $(this.rootElement).parent().parent();
                elem.css({ 'width': elem.width() + 'px', 'padding': '0 5px 0 px' });
            },
            beforeRender: function beforeRender(b) {
                if (this.$IsAdded == undefined) {
                    _.$scope.CurrentObject[PropertyName] = Enumerable.From(_.$scope.CurrentObject[PropertyName]).Where('$.$IsNewRow != true').ToArray();
                    var IsAddNew = true;
                    //console.log(ListView.Columns);
                    var Columns = Enumerable.From(ListView.Columns).Where('$.IsRequired == true').ToArray();

                    $.each(_.$scope.CurrentObject[PropertyName], function (i, o) {
                        if (o.ID == null) o.ID = getRandomInt() * -1;
                        //
                        //
                        //
                        $.each(Columns, function (c, p) {
                            if (o[p.data] == null) IsAddNew = false;
                            if (o[p.data] != null) {
                                if (p.type === undefined) {
                                    //String
                                    if (o[p.data].trim().length === 0) {
                                        IsAddNew = false;
                                    }
                                }
                            }
                        });

                        if (IsAddNew == false) {
                            o.ID = null;
                            o.$IsNewRow = true;
                        }
                    });

                    if (this.IsReadOnly != true) {
                        if (IsAddNew == true) {
                            _.$scope.CurrentObject[PropertyName].push({ ID: null, $IsNewRow: true });
                        }
                    }

                    this.$IsAdded = true;
                } else {
                    this.$IsAdded = undefined;
                }
            },
            afterCreateRow: function afterCreateRow(b) {},
            beforeChange: function beforeChange(c, s) {
                if (c == null) return;
                var rowIndex = c[0][0];
                var KeyObject = this.view.settings.data[rowIndex];

                if (KeyObject.$IsNewRow === true) {
                    KeyObject.ID = getRandomInt() * -1;
                    KeyObject.$IsNewRow = undefined;
                }
                //if (KeyObject.ID === null || KeyObject.ID == undefined) {

                //}
            },
            afterChange: function afterChange(c, s) {
                if (c == null) return;
                var rowIndex = c[0][0];
                var KeyObject = this.view.settings.data[rowIndex];

                if (this.view.settings.data.length == rowIndex + 2) {

                    var ScrollViewTop = $(this.rootElement).find('.ht_master').find('.wtHolder')[0];
                    var Height = $($(ScrollViewTop).children()[0]).height();
                    $($(ScrollViewTop).children()[0]).height(Height - 10);
                    $(ScrollViewTop).scrollTop(Height);
                }

                if (this.HasMaxWidth == undefined) {
                    var elem = $(this.rootElement).parent().parent();
                    elem.css({ 'width': elem.width() + 'px' });
                    this.HasMaxWidth = true;
                }

                //var event = {
                //    row: c[0][0],
                //    dataField: c[0][1],
                //    oldVal: c[0][2],
                //    newVal: c[0][3]
                //};

                var Column = Enumerable.From(this.view.settings.columns).Where("$.data == '" + c[0][1] + "'").ToArray()[0];
                if (Column.editor === 'dxListView' || Column.editor === 'dxSelectBox') return;

                if (_[PropertyName + '_onColumnChanged'] !== undefined) {

                    _[PropertyName + '_onColumnChanged'].call(this, {
                        data: c[0][3],
                        dataField: c[0][1],
                        key: KeyObject,
                        grid: this,
                        rowIndex: rowIndex
                    });
                }

                _.$scope.CurrentObject.$dirty = true;
            },
            cells: function cells(row, col, prop) {
                var cellProperties = {};
                if (this.type != "checkbox") {
                    if (cellProperties.renderer == null || cellProperties.renderer == undefined) {
                        cellProperties.renderer = _.CustomRenderer;
                    }
                }

                if (this.instance.IsReadOnly == true) {
                    cellProperties.readOnly = true;
                } else {
                    if (this.AllowEdit != false) {
                        cellProperties.readOnly = false;
                    }
                }

                if (this.editor === 'dxListView' || this.editor === 'dxSelectBox') {
                    if (cellProperties.onItemSelected == undefined) {
                        cellProperties.onItemSelected = function (e) {
                            if (_[PropertyName + '_onColumnChanged'] !== undefined) {

                                _[PropertyName + '_onColumnChanged'].call(this, {
                                    data: e.value,
                                    dataField: e.dataField,
                                    key: e.key,
                                    grid: this
                                    //, rowIndex: rowIndex
                                });
                            }
                        };
                    }
                }
                return cellProperties;
            },
            fixedColumnsLeft: 1
        };
    };

    BaseViewController.prototype.CustomRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        if (value != null) {
            var KeyObject = instance.view.settings.data[row];
            if (cellProperties.DisplayProperty != undefined) {
                $(td).html(KeyObject[cellProperties.DisplayProperty]);
            } else {
                if (cellProperties.type == "numeric") {
                    if (cellProperties.data !== 'ID') {
                        $(td).html(Globalize.format(value, "n2"));
                    } else {
                        $(td).html(value);
                    }
                } else {
                    $(td).html(value);
                }
            }
        } else {
            $(td).html('');
        }
        cellProperties.validator(value, function (p) {
            if (p == false) {
                $(td).addClass('InvalidCell');
            }
        });
        if (cellProperties.readOnly == true) {
            $(td).addClass('htTdReadOnly');
        }
        if (cellProperties.IsRequired == true) {
            $(td).addClass('htTdRequired');
        }
        return td;
    };

    BaseViewController.prototype.onSetFormReadOnly = function (IsReadOnly) {
        var _ = this;
        if (_.$HotTableList !== undefined && _.$HotTableList !== null) {
            $.each(_.$HotTableList, function (i, h) {
                h.IsReadOnly = IsReadOnly;
                h.validateCells(function (p) {});
                h.render();
                //alert('fsdfsadfsda');
            });
        };
    };

    return BaseViewController;
});

