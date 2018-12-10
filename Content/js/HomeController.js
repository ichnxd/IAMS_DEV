app.controller('HomeController', ['$http', '$scope',
    '$timeout', 'JSDataService', '$urlRouter', '$rootScope', 'JsModalFactory',
    'JsPopUpView', 'CacheFactory', '$base64', 'toastr',
function ($http, $scope, $timeout, JSDataService, $urlRouter, $rootScope, JsModalFactory, JsPopUpView, CacheFactory, $base64, toastr) {

    var proxy = $.connection.IAppHub;

    var ISSUETRACKER_MODEL = 3179;

    proxy.client.onSessionTimeOut = function () {
        JsPopUpView.ShowSessionTimeout();
    }

    proxy.client.onConnectionInit = function () {
        var ID_CurrentUser = $rootScope.CurrentUser.ID;
        proxy.server.register(ID_CurrentUser);
    };

    proxy.client.onNotificationRecieved = function (Message,ID_Model,ID_CurrentObject) {
       
        if (ID_Model == ISSUETRACKER_MODEL) {

            toastr.warning(Message, 'ISSUE TRACKER', {
                autoDismiss: false,
                closeButton: true,
                tapToDismiss: true,
                onTap: function (e) {

                    //
                    //
                    //

                    $rootScope.$emit("CallNewTabMethod", {
                        ID: ID_CurrentObject * ISSUETRACKER_MODEL,
                        Caption: 'Issue Tracker',
                        ID_ViewType: 2,
                        positionClass: 'toast-bottom-left',
                        ID_CurrentObject: ID_CurrentObject,
                        ViewID: 4140,
                    });

                }
            } );


        } else {
            toastr.info(Message, 'Notification', {
                closeButton: true
            });
        }
    };

    $.connection.hub.disconnected(function () {

    });


    var JSTabCache = CacheFactory.get('JSTabCache');

    if (!JSTabCache) {
        JSTabCache = CacheFactory('JSTabCache', {
            cacheFlushInterval: 60 * 60 * 1000,
            deleteOnExpire: 'aggressive',
            storageMode: 'localStorage'

        });
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    document.body.onkeydown = function (e) {
        if (e.ctrlKey === true && e.keyCode == 32) {
            ToggleSideMenuNavigation();
        };

        if (e.ctrlKey === true && e.keyCode == 116) {
            RefreshApplicationCache();
        };


    };

    var RefreshApplicationCache = function () {
        JSDataService.Post('/Home/LogOut').then(function () {

            JSTabCache.destroy();
            //var appCache = window.applicationCache;
            //appCache.update();
            //if (appCache.status == window.applicationCache.UPDATEREADY) {
            //    appCache.swapCache();
            //}
            window.localStorage.clear();
            window.location.replace('/Home');
        });
    }

    $scope.NotifBugOption = {

    }

    $scope.NotifEmailOption = {

    }

    $scope.NotifGlobalOption = {

    }

    $scope.dxHomeMenu = {
        items: [
            {
                icon: 'mdi mdi-account-circle',
                text: "My Account",
                items: [
                    //{ text: "View My Profile" },
                    { ID: -10002, icon : 'mdi mdi-refresh', text: "Refresh App" },
                    { ID: -10000, icon : 'mdi mdi-database', text: "Backup Database" },
                    { ID: -10001, icon : 'mdi mdi-logout' , text: "Logout" },
                ]
            }, {
                text: 'View',
                icon : 'mdi mdi-view-quilt',
                items: [
                    { ID: -10003, icon: 'mdi mdi-view-list', text: 'Navigation Explorer' },
                    { ID: -10004, icon: 'mdi mdi-close-box', text: 'Close Current Tab' },
                    { ID: -10005, icon: 'mdi mdi-close-box-outline', text: 'Close All' }

                ]
            }, {
                text: 'About',
                icon: 'mdi mdi-information-outline',
                items: [
                    //{ icon: 'mdi mdi-webpack', text: 'Developers' },
                    { icon: 'mdi mdi-information', text: 'Software Version' }
                ]
            }
            //,{
            //    text: "Favorites",
            //    items: [
            //        { text: "VS Integration" },
            //        { text: "UI Widgets" },
            //        { text: "Data Visualization" },
            //        { text: "Data Layer" }
            //    ]
            //}, {
            //     text: "Accounting",
            //     items: [
            //         { text: "VS Integration" },
            //         { text: "UI Widgets" },
            //         { text: "Data Visualization" },
            //         { text: "Data Layer" }
            //     ]
            // }, {
            //    text: "Reports",
            //    items: []
            //},
            //{
            //    text: "Help",
            //    items: [
            //        { id: -50001, text: 'Issue Tracker' },
            //        { text: 'Check Version' },
            //    ]
            //},
        ],
        onItemClick: function (data) {
            switch (data.itemData.ID) {
                case -10000:
                    window.open('/Home/BackupDatabase');
                    break;
                case -10003:
                    ToggleSideMenuNavigation();
                    break;
                case -10001:
                    DevExpress.ui.dialog.confirm('Are you sure you want to Logout', 'IAMS').done(function (dialogResult) {
                        if (dialogResult) {
                            JSDataService.Post('/Home/LogOut').then(function () {
                                JSTabCache.destroy();

                                //var appCache = window.applicationCache;
                                //appCache.update();
                                //if (appCache.status == window.applicationCache.UPDATEREADY) {
                                //    appCache.swapCache(); 
                                //}

                                window.location.replace('/Login');
                            });
                        }
                    });
                    break;
                case -10002:
                    RefreshApplicationCache();
                    break;
                case -50001:
                    //
                    //
                    //

                    break;
                case -10004:
                    break;
                case -10005:
                    break;
            }
        }
    };


    $scope.Navigations = [];

    $scope.navigationTabs = [];
    $scope.currentTabIndex = 0;
    $scope.currentTab = null;

    $rootScope.$on("CallNewTabMethod", function (event, Navigation) {
        OnNavigationClick(Navigation);
    });

    var ToggleSideMenuNavigation = function () {
        if ($('#JSWebApp').hasClass('js-navigation-close')) {
            $('#JSWebApp').removeClass('js-navigation-close');
            $('#JsBackWrapContent').removeClass('nav-close');
        } else {
            $('#JSWebApp').addClass('js-navigation-close');
            $('#JsBackWrapContent').addClass('nav-close');
        }
    }

    var generateID = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    var getRandomInt = function() {
        var min = 1000, max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var TabControl = null;

    var OnNavigationClick = function (navigationObject, IsNewInstance) {
        
        if (navigationObject.ID_ViewType == 4) {
            if (navigationObject.StateName == null) {
                navigationObject.StateName = navigationObject.Name + 'ReportState';
            }
        }
        if (navigationObject.IsParent == true) return;

        var CurrentNavigation = null;

        if (IsNewInstance === undefined) IsNewInstance = false;

        if (IsNewInstance === false) {

            CurrentNavigation = Enumerable.From($scope.navigationTabs)
                .Where(function (nav) {
                    return nav.id == navigationObject.ID
                }).FirstOrDefault();

        } 


        if (CurrentNavigation != null) {

            $scope.currentTab = CurrentNavigation;
            $scope.currentTabIndex = CurrentNavigation.id;

        } else {

            if (IsNewInstance === true) {
                navigationObject.ID = navigationObject.ID * getRandomInt(2, 100);
            }
            
            $timeout(function () {
                var idTab =  generateID();
                $scope.navigationTabs.push({
                    id: navigationObject.ID
                 , title: navigationObject.Caption
                 , icon: navigationObject.ImageName
                 , ID_ViewType: navigationObject.ID_ViewType
                 , fixed: true
                 , ID_View: navigationObject.ViewID
                 , ID_CurrentObject: navigationObject.ID_CurrentObject
                 , ID_Report: navigationObject.ID_Report
                 , CurrentObject: navigationObject.CurrentObject
                 , params: navigationObject.params
                 , _ID: idTab
                 , toolTipOption: {
                     target: '#' + idTab,
                     position: "top",
                     onInitialized: function (e) {
                         e.component.tabid = navigationObject.ID;
                         $timeout(function () {
                             $('#' + idTab).unbind().hover(function () {
                                 if (e.component.tabid === $scope.currentTab.id) return;
                                 e.component.show();
                             }, function () {
                                 e.component.hide();
                             });
                         }, 1000);

                     }
                 }
                });

                $timeout(function () {
                    $scope.currentTab = $scope.navigationTabs[$scope.navigationTabs.length - 1];
                    $scope.currentTabIndex = $scope.currentTab.id;
                    $scope.currentTab.IsInit = navigationObject.IsInit;
                    TabControl.SwitchTab($scope.currentTab);
                });

            }, 100)
        }
    }

    $scope.SearchValue = '';

    var SearchBox = null;

    $scope.SearchTextBox = {
        placeholder: 'Search',
        showClearButton: true,
        mode: 'search',
        visible:false,
        onInitialized: function (e) {
            SearchBox = e.component;
        }
    };

    
    var dxTreeViewContextMenu = null;

    $scope.treeViewMenuOptions = {
        onInitialized: function (e) {
            dxTreeViewContextMenu = e.component;
        },
        target: '#none',
        items: [],
        onItemClick: function (e) {
            switch (e.itemData.id) {
                case 1:
                    //
                    //
                    //
                    var win = window.open('ReportView/Viewer?ID=' + e.component.option("ID_Report"), '_blank');
                    win.focus();

                    //var form = $("<form/>").attr({
                    //    method: "post",
                    //    action: 'ReportView/Viewer',
                    //    target: "_blank"
                    //})
                    //.append($("<input type='hidden' name='ID'/>").attr('value',))
                    //.appendTo('body').submit().remove();
                    break;
                case 2:

                    break;
            }
        }
    }

    $scope.treeViewOptions = {
        bindingOptions: {
            searchValue: "SearchValue",
            items: "Navigations",
        },
        //itemTemplate: 'Item',
        itemTemplate: function (itemData, itemIndex, itemElement) {
            var html = null;
            if ( itemData.IsParent == true ) { 
                html = '<div class="js-container JS-Nav-Parent">';
            } else {
                html = '<div class="js-container JS-Nav-Icon">';
            }
            html += '<div class="js-container-navitem">'; 
            html += '<div class="icon">';
            if ( itemData.IsParent == true ) {  
                html += '<span class="icon fa nav-folder-icon"></span> '
            } else {
                html += '<span class="icon ' + itemData.ImageName + '"></span>';
            }
            html += '</div>';
            html += '<div class="caption">';
            if ( itemData.IsParent == true ) {
                html += '<span class="is-parent navigation-name">{{text}}</span>';
            } else {
                html += '<span class="navigation-name">{{text}}</span>';
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
            return html;
        },
        noDataText: "",
        onItemContextMenu: function (e) {
            var Items = [];
            if (e.itemData.ID_ViewType === 3) {
                var target = e.itemElement;
                id = target.parent().attr("data-item-id");
                target.attr("id", id);
                dxTreeViewContextMenu.option("target", "#" + id);
                dxTreeViewContextMenu.option("ID_Report", e.itemData.ID_Report);
                Items.push({ id: 1, text: "Open Report in new tab", icon: 'mdi mdi-tab-unselected' });
            }

            dxTreeViewContextMenu.option("items", Items);
        },
        onItemClick: function (e) {
            if (e.itemData.ID == -1000) {
                window.open("ReportDesigner");
                return;
            }
       
            var IsNewInstance = e.jQueryEvent.altKey === true && e.jQueryEvent.ctrlKey === true;

            var navigation = e.itemData;

            if ($rootScope.CurrentUser.IsDeveloperMode === true) {

                if (e.jQueryEvent.ctrlKey == true) {
                    //
                    //
                    // OPEN NAVIGATION WINDOW

                    var navigationObject = {

                        ID: getRandomInt(),
                        Caption: 'Navigation',
                        ID_ViewType: 2,
                        ViewID: 11,
                        ID_CurrentObject: navigation.ID,
                        ImageName: ''

                    };

                    OnNavigationClick(navigationObject, false);

                    return;
                }
            }

            if (navigation.IsParent) {
                if (navigation.items.length > 0) {
                    var treeView = $(e.element).dxTreeView('instance');
                    if (e.node.expanded) {
                        treeView.collapseItem(e.itemElement)
                    } else {
                        treeView.expandItem(e.itemElement);
                    }
                }
            } else {
                OnNavigationClick(navigation, IsNewInstance);
            }
        }
    }

    $scope.CloseAllWindow = function () {
        TabControl.CloseAllTabs();
    }

    $scope.registerTab = function (tabControl) {

        TabControl = tabControl;

        JSDataService.GetNavigations().then(function (Navigations) {

            $scope.Navigations = Navigations;

            SearchBox.option('visible',Navigations.length >= 5 );
            
            var CacheState = JSTabCache.get('/CurrentState');

            if (CacheState !== undefined) {

                if (CacheState.CurrentTabState.length > 0) {

                    var CurrentTabIndex = null;

                    $.each([CacheState.CurrentTabState[CacheState.CurrentTabState.length -1]], function (index, tab) {

                        $timeout(function () {

                            $scope.navigationTabs.push(tab);

                            tab.IsRepaint = true;
                           
                            CurrentTabIndex = tab.id;

                            TabControl.SwitchTab(tab);

                        }, 500);
                    });

                    $timeout(function () {
                        $scope.currentTabIndex = CurrentTabIndex;
                    }, 500);

                    return;
                }

            }

        });
    }

    $timeout(function () {

        JSDataService.GetCurrentUser().then(function (CurrentUser) {

            $rootScope.CurrentUser = CurrentUser;
            
            setTimeout(function () {
                //$.connection.IAppHub
                $.connection.hub.start({ jsonp: true }).done(function () {


                });
            }, 500);

        });

    }, 1000)
    

}]);