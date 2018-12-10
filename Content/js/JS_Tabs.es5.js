'use strict';

app.directive('jstab', ['$rootScope', '$state', '$timeout', 'JSDataService', '$controller', '$compile', 'CacheFactory', '$base64', 'JsPopUpView', function ($rootScope, $state, $timeout, JSDataService, $controller, $compile, CacheFactory, $base64, JsPopUpView) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            tabs: '=?',
            currenttabindex: '=?',
            currenttab: '=?',
            ontabsclear: '&',
            register: '&'
        },
        link: function link($scope, element, attrs) {

            var JSTabCache = CacheFactory.get('JSTabCache');

            //element.css({ width: $(window).width() - 270 });

            $scope.IsLoadError = false;

            $scope.CloseTab = function (tab) {

                if (tab.NewScope !== undefined) {
                    tab.CloseModule();
                } else {
                    removeTab(tab);
                }
            };

            var escapeHTML = function escapeHTML(html) {
                return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            };

            var InitView = function InitView(tab, View, ID_ViewType, CurrentObject, Params) {

                var SrcController = null;
                //console.log(ID_ViewType);
                var _viewid = makeid();

                switch (ID_ViewType) {
                    case 1:
                        //ListView
                        SrcController = '/JsApp/ListView?ID=' + View.ID + '&ViewName=' + View.Name;
                        break;
                    case 2:
                        //DetailView
                        SrcController = '/JsApp/DetailView?ID=' + View.ID + '&ViewName=' + View.Name;
                        break;
                    case 3:
                        //Report
                        SrcController = '/ReportView/GetReportController?ID_Report=' + tab.ID_Report;
                        break;
                    case 4:
                        break;
                    case 5:
                        if (View.ControllerPath == null) throw Error("Controller Path not defined");
                        SrcController = '/JsApp/GetScript?Url=' + encodeURI(View.ControllerPath);
                        break;
                    case 6:
                        SrcController = '/JsApp/TreeView?ID=' + View.ID;
                        break;
                    case 7:
                        SrcController = '/Analytics/JsDashboard';
                        break;
                }

                if (View.CurrentUser.IsDeveloperMode !== true) {
                    if (ID_ViewType === 1 || ID_ViewType === 2) {
                        if (View.JsController !== null) {
                            //alert('xxxx');
                            //console.log('JsController', View.JsController);
                            SrcController = '/App_Content/ModuleJs/' + View.JsController;
                        }
                    }
                }

                if (ID_ViewType === 3) {
                    View.ViewControllerName = View.Name + 'Controller';
                }

                if (View.ViewControllerName == null) View.ViewControllerName = View.Name + 'Controller';

                //console.log(View.CurrentUser.Name, View);

                var viewControllerInitialized = function viewControllerInitialized() {
                    var NewScope = $rootScope.$new(true);

                    tab.$ID_View = View.ID;

                    NewScope.PageSlideViewOpen = {
                        Open: false
                    };

                    var ViewOption = {};

                    if (ID_ViewType == 2) {
                        ViewOption.$onCurrentObjectSaved = tab.$onCurrentObjectSaved;
                        ViewOption.$ClosedAfterSaved = tab.$ClosedAfterSaved;
                        ViewOption.DataSource = View.DataSource;
                    }

                    NewScope.InitView = function (e) {
                        if (NewScope.OnElementInit != undefined) {
                            NewScope.OnElementInit(e);
                        }
                    };

                    if (tab.IsRepaint == true) {

                        NewScope.RepaintView = true;

                        tab.Repaint = function () {

                            if (NewScope.RefreshView !== undefined) {
                                NewScope.RefreshView();
                            }
                        };
                    }

                    NewScope.$Tab = tab;

                    NewScope.IsHide = false;

                    NewScope.$params = Params;

                    //
                    //
                    //
                    var ShowInvalidAccess = function ShowInvalidAccess() {
                        tab.IsLoadError = false;
                        tab.DisplayMessage = 'User does not have access on ' + View.ModelName + '. Please contact your System Administrator.';
                        tab.icon = 'mdi mdi-emoticon-sad';
                        tab.ShowProgress = false;
                        tab.BgColor = '#bd0000';
                        tab.foreColor = "#fff";
                        tab.IsAllow = false;
                    };

                    NewScope.$CurrentUser = View.CurrentUser;
                    tab.IsAllow = true;
                    var UserViewAccess = null;

                    if (ID_ViewType === 2 || ID_ViewType === 1) {
                        if (View.ViewAccess === undefined || View.ViewAccess === null) {
                            ShowInvalidAccess();
                            return;
                        } else {
                            UserViewAccess = View.ViewAccess[0];
                            if (UserViewAccess !== undefined) {
                                if (UserViewAccess.IsDeveloper !== 1) {
                                    if (ID_ViewType === 2 || ID_ViewType === 1) {
                                        if (!(UserViewAccess.IsAllow === true && UserViewAccess.IsDeny !== true)) {
                                            ShowInvalidAccess();
                                            return;
                                        }
                                    } else {
                                        if (CurrentObject.ID === -1) {
                                            if (UserViewAccess.IsCanWrite === false) {
                                                alert('User does not allow to create on module ' + View.ModelName);
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (ID_ViewType === 1 || ID_ViewType === 2) {
                        if (UserViewAccess === null || UserViewAccess === undefined) UserViewAccess = {};
                        UserViewAccess.OwnerRights = View.OwnerRights;
                    }
                    //alert('xxxx');
                    //console.log(UserViewAccess);
                    var VC = $controller(View.ViewControllerName, {
                        $scope: NewScope,
                        ViewStateName: null,
                        IsModal: false,
                        ModalMode: {},
                        CurrentObject: CurrentObject,
                        ReportParams: Params,
                        $ViewOption: ViewOption,
                        $ViewAccess: UserViewAccess,
                        $OwnerRights: View.OwnerRights,
                        DashboardSettings: ID_ViewType == 7 ? {
                            Path: View.ViewPath,
                            ViewId: _viewid
                        } : null
                    });

                    if (ID_ViewType === 1) {
                        VC.LvModel.ID_Tab = tab.id;
                    }

                    if (ID_ViewType === 2) {
                        VC.ListViewTab = tab.ListViewTab;
                        NewScope.IsNewObject = true;
                    }

                    //if (ID_ViewType === 3) {
                    //    VC.OwnerRights = View.OwnerRights;;
                    //}

                    NewScope.CloseModule = function (IsForceClose) {

                        if (IsForceClose !== undefined) NewScope.CurrentObject.$dirty = false;

                        if (ID_ViewType === 2) {
                            if (VC.IsFormReadOnly != true) {
                                if (NewScope.CurrentObject.$dirty == true) {

                                    DevExpress.ui.dialog.confirm("Do you want to discard changes?", View.DisplayName).done(function (dialogResult) {
                                        if (dialogResult) {
                                            $timeout(function () {
                                                removeTab(tab);
                                            });
                                        }
                                    });
                                } else {
                                    removeTab(tab);
                                }
                            } else {
                                removeTab(tab);
                            }
                            return;
                        }
                        removeTab(tab);
                    };

                    tab.CloseModule = NewScope.CloseModule;

                    if (ID_ViewType == 2) {
                        tab.NewScope = NewScope;
                    }

                    var template = null;

                    if (ID_ViewType == 5) {
                        template = '<div id="' + View.Name + '" class="JsCustomView" ng-include="ViewSrc" style="height:100%"></div>';
                    } else {
                        template = '<div ng-include="ViewSrc" style="height:100%"></div>';
                    }

                    var _compiled = $compile(template)(NewScope);

                    $('#' + View.ContainerID).attr('tabindex', View.ID);

                    $('#' + View.ContainerID).html(_compiled);

                    tab.focusView = function () {
                        $timeout(function () {
                            $('#' + View.ContainerID).focus();
                        }, 100);
                    };

                    $timeout(function () {

                        switch (ID_ViewType) {
                            case 1:
                                NewScope.ViewSrc = '/ListView?ID=' + View.ID + '&ViewName=' + View.Name;
                                break;
                            case 2:
                                NewScope.ViewSrc = '/DetailView?ID=' + View.ID + '&ViewName=' + View.Name;
                                break;
                            case 3:
                                var ID_CurrentObject = Params != undefined ? Params != null ? Params.ID : 0 : 0;

                                //NewScope.ViewSrc = '/ReportView/Template?ID=' + View.ID + '&ID_CurrentObject=' + ID_CurrentObject;
                                NewScope.ViewSrc = '/ReportView/Template?ID=' + tab.ID_Report + '&ID_CurrentObject=' + ID_CurrentObject;
                                break;
                            case 5:
                                NewScope.ViewSrc = '/JsApp/GetView?Url=' + encodeURI(View.ViewPath);
                                break;
                            case 6:
                                NewScope.ViewSrc = '/JsApp/TreeViewTemplate';
                                break;
                            case 7:
                                NewScope.ViewSrc = '/Analytics/Wrapper?ViewName=' + _viewid;
                                break;
                        }

                        $('#' + View.ContainerID).bind('keydown', function (event) {
                            //
                            //
                            //
                            if (tab.onTab_KeyDown !== undefined) {
                                tab.onTab_KeyDown(event);
                            }
                        });

                        $('#' + View.ContainerID).focus();
                    });

                    //
                    //
                    //
                };

                JSDataService.LoadController(View.ViewControllerName, ID_ViewType, SrcController).then(function () {
                    viewControllerInitialized();
                }, function (err) {

                    switch (ID_ViewType) {
                        case 1:
                            //ListView
                            SrcController = '/JsApp/ListView?ID=' + View.ID + '&ViewName=' + View.Name;
                            break;
                        case 2:
                            //DetailView
                            SrcController = '/JsApp/DetailView?ID=' + View.ID + '&ViewName=' + View.Name;
                            break;
                        case 3:
                            //Report
                            SrcController = '/ReportView/GetReportController?ID_Report=' + tab.ID_Report;
                            break;
                    }

                    JSDataService.LoadController(View.ViewControllerName, ID_ViewType, SrcController).then(function () {
                        viewControllerInitialized();
                    });

                    $scope.CloseModule = function () {
                        removeTab(tab);
                    };

                    tab.IsLoadError = true;
                });
            };

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }

            var tabControl = {

                SwitchTab: function SwitchTab(tab) {

                    tab.IsLoadError = false;

                    if (tab.params == undefined) tab.params = null;

                    tab.DisplayMessage = "Intellismart Inc. 2016";

                    RefreshCache();

                    tab.BgColor = '#ddd';
                    //console.log('tab',tab);
                    var Data = {
                        ID: tab.ID_ViewType === 3 ? tab.ID_Report : tab.ID_View,
                        ID_ViewType: tab.ID_ViewType,
                        ViewName: null,
                        ID_Navigation: tab.id,
                        ID_CurrentObject: tab.ID_CurrentObject
                    };

                    JSDataService.GetCurrentObject('/JsApp/GetModelView', Data, false).then(function (View) {

                        if (View === null) {
                            //
                            //
                            JsPopUpView.ShowSessionTimeout();
                            return;
                        }

                        //                        console.log('VIEW ACCESS',View);

                        if (tab.ID_ViewType === 1 || tab.ID_ViewType === 2) {
                            tab.DisplayMessage = '(' + View.DisplayName + ')';
                            tab.icon = View.Icon;
                        }

                        if (tab.ID_ViewType === 2) {
                            if (View.PrimaryColor !== undefined) {
                                tab.foreColor = '#fff';
                                tab.BgColor = View.PrimaryColor;
                            }
                        } else if (tab.ID_ViewType === 3) {
                            tab.BgColor = '#ed7a15';
                            tab.foreColor = '#fff';
                        } else if (tab.ID_ViewType === 5) {
                            tab.BgColor = View.PrimaryColor;
                            tab.foreColor = '#fff';
                        } else {
                            tab.foreColor = View.PrimaryColor;
                            //tab.BgColor = '#7F' + View.PrimaryColor.replace('#', '');
                            //console.log(tab.BgColor); 
                        }

                        //tab.ViewName = 'tb' + View.Name + '_' + tab.id;
                        tab.ViewName = makeid();

                        View.ContainerID = tab.ViewName;

                        tab.$isInit = true;

                        if (tab.ID_ViewType === 2) {

                            if (tab.CurrentObject !== undefined) {

                                InitView(tab, View, tab.ID_ViewType, tab.CurrentObject, tab.params);
                            } else {

                                JSDataService.GetCurrentObject('/JsApp/GetCurrentObject', {
                                    ID: View.ID,
                                    ViewName: View.Name,
                                    DataSource: View.DataSource,
                                    ID_CurrentObject: tab.ID_CurrentObject === undefined ? -1 : tab.ID_CurrentObject,
                                    //, params: tab.params
                                    params: tab.params != null ? JSON.stringify(tab.params) : null
                                }, false).then(function (CurrentObject) {

                                    tab.title = View.DisplayName;

                                    tab.title = tab.title.replace('(New)', '');

                                    if (CurrentObject.ID !== -1) {
                                        //tab.title = tab.title + (CurrentObject[View.DisplayProperty] == null ? " (New)" : " (" + CurrentObject[View.DisplayProperty] + ")");
                                        tab.title = tab.title + (CurrentObject.ID < 0 ? " (New)" : " (" + CurrentObject["ID"] + ")");
                                    } else {
                                        tab.title = tab.title + " (New)";
                                    }

                                    InitView(tab, View, tab.ID_ViewType, CurrentObject, tab.params);
                                });
                            }
                        } else if (tab.ID_ViewType === 5) {

                            if (View.IsHasDataSource === true) {

                                JSDataService.GetCurrentObject('/JsApp/GetCurrentObject', {
                                    DataSourceKey: 'Ds' + View.Name,
                                    params: tab.params != null ? JSON.stringify(tab.params) : null
                                }).then(function (CurrentObject) {

                                    InitView(tab, View, tab.ID_ViewType, CurrentObject, tab.params);
                                });
                            } else {
                                InitView(tab, View, tab.ID_ViewType);
                            }
                        } else {
                            if (tab.ID_ViewType == 3) {}
                            //tab.title = View.Caption; //+ ' (' + tab.title + ')';

                            //console.log('Report', View);
                            InitView(tab, View, tab.ID_ViewType, null, tab.params);
                        }
                    });
                }
            };

            var counter = 1;

            if ($scope.tabs == undefined) $scope.tabs = [];

            $scope.$watch('currenttab', function (i, o) {
                if (i == null) return;
                if (i.ID_ViewType === 1) {
                    if (i.$dirty === true) {
                        i.$Refresh();
                        i.$dirty = false;
                    }
                }
            });

            var removeTab = function removeTab(tab) {

                if (tab.$scope !== undefined) {
                    tab.$scope.$destroy();
                }

                $.each($scope.tabs, function (i) {
                    if ($scope.tabs[i].id === tab.id) {
                        $scope.tabs.splice(i, 1);
                        return false;
                    }
                });

                if ($scope.tabs.length > 0) {
                    var lastTab = $scope.tabs[$scope.tabs.length - 1];
                    lastTab.isReload = false;
                    $scope.currenttabindex = lastTab.id;
                    $scope.currenttab = lastTab;
                    if ($scope.tabs.length == 1) {
                        if ($scope.ontabsclear != undefined) {
                            $scope.ontabsclear();
                        }
                    }
                }

                //var JSTabCache = CacheFactory.get('JSTabCache');
                //
                //JSTabCache.put('/CurrentState', {
                //    CurrentTabState: $scope.tabs,
                //    CurrentTabIndex: $scope.currenttabindex
                //});
                RefreshCache();
            };

            var _contextMenus = [{ id: 1, text: 'Close', icon: 'fa fa-close' }, { id: 2, text: 'Close others', icon: 'mdi mdi-close-box' }, { id: 3, text: 'Close All', icon: 'mdi mdi-close-box-outline' }, {
                id: 4, text: 'Send Feedback', icon: 'mdi mdi-send', items: [{
                    id: 5, text: 'Report a Problem', icon: 'mdi mdi-bug'
                }, {
                    id: 6, text: 'Provide a Suggestion', icon: 'mdi mdi-bug'
                }]
            }];

            $scope.dxContextMenu = {
                items: _contextMenus,
                //target: $(element),
                onPositioning: function onPositioning(e) {
                    console.log('positioning', e);
                },
                onShowing: function onShowing(e) {
                    var Target = $(e.jQEvent.target);
                    if (!(Target.hasClass('context-menu') || Target.hasClass('uib-tab') || Target.hasClass('nav-link'))) {
                        e.jQEvent.stopPropagation();
                        e.jQEvent.preventDefault();
                        e.cancel = true;
                    } else {
                        var LiElement = Target.closest("li");
                        if (!LiElement.hasClass('active')) {
                            e.cancel = true;
                            return;
                        }
                        var index = LiElement.index();
                        var CurrentTab = $scope.tabs[index];
                        e.component.option('CurrentTabID', CurrentTab.id);
                    }
                },
                onItemClick: function onItemClick(e) {
                    var tabID = e.component.option('CurrentTabID');
                    var CurrentTab = Enumerable.From($scope.tabs).Where(function (t) {
                        return t.id === tabID;
                    }).SingleOrDefault();
                    //console.log('ON ITEM CLICK',e);
                    switch (e.itemData.id) {
                        case 1:
                            CurrentTab.CloseModule();
                            break;
                        case 2:
                            var Tabs = Enumerable.From($scope.tabs).Where(function (t) {
                                return t.id !== tabID;
                            }).ToArray();
                            $.each(Tabs, function (i, t) {
                                t.CloseModule();
                            });
                            break;
                        case 3:
                            $.each($scope.tabs, function (i, t) {
                                $timeout(function () {
                                    t.CloseModule();
                                }, 100);
                            });
                            break;
                        case 5:
                        case 6:
                            CurrentTab.IssueTracker(e.itemData.id);
                            break;
                    }
                }
            };

            $scope.onTabClick = function (tab) {

                tab.isReload = false;

                $scope.currenttab = tab;

                if (tab.focusView !== undefined) {
                    tab.focusView();
                }

                if (tab.IsRepaint === true) {

                    tab.IsRepaint = false;

                    if (tab.Repaint != undefined) tab.Repaint();

                    tab.Repaint = undefined;
                }

                RefreshCache();
            };

            var RefreshCache = function RefreshCache() {
                var CurrentTabs = [];
                $.each($scope.tabs, function (i, tab) {
                    var tab = {
                        id: tab.id,
                        title: tab.title,
                        icon: tab.icon,
                        ID_ViewType: tab.ID_ViewType,
                        fixed: tab.fixed,
                        ID_View: tab.ID_View,
                        ID_CurrentObject: tab.ID_CurrentObject,
                        ID_Report: tab.ID_Report,
                        CurrentObject: tab.CurrentObject,
                        params: tab.params,
                        ListViewTab: tab.ListViewTab,
                        _ID: tab._ID
                    };
                    CurrentTabs.push(tab);
                });

                console.log('=====>CurrentState', CurrentTabs);

                JSTabCache.put('/CurrentState', {
                    CurrentTabState: CurrentTabs,
                    CurrentTabIndex: $scope.currenttabindex
                });
            };

            $timeout(function () {
                var tabContent = element.find('.tab-content');

                var Top = tabContent.position().top;

                var StatusBarTop = $(window).height();

                $scope.ContentHeight = StatusBarTop - Top - 35 - 55;

                $(tabContent).css({ height: $scope.ContentHeight });

                tabControl.CloseAllTabs = function () {
                    $.each($scope.tabs, function (i, t) {
                        $timeout(function () {
                            t.CloseModule();
                        }, 100);
                    });
                };

                tabControl.CloseCurrentTab = function () {
                    var Tab = Enumerable.From($scope.tabs).Where('$.id ===' + $scope.currenttabindex).SingleOrDefault();
                    if (Tab !== undefined) Tab.CloseModule();
                };

                tabControl.RefreshCache = RefreshCache;

                if ($scope.register != undefined) {
                    $scope.register({
                        TabControl: tabControl
                    });
                }
            });
        },
        templateUrl: '/Templates/JSTabs.tpl.html'
    };
}]);

