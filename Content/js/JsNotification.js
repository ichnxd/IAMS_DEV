app.directive('jsNotif', ['$q', '$compile', 'JSDataService', '$timeout', '$templateCache', function ($q, $compile, JSDataService, $timeout, $templateCache) {

    return {
        restrict: 'E',
        scope: {
            option: '=',
            background: '@',
            icon: '@',
        },
        link: function (scope, element, attr) {

            var makeid = function() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }

            var _ = { };
            
            var ID = makeid();

            if (scope.option === undefined) scope.option = {};
            $(element).addClass('js-notif');
            $(element).addClass('jstooltip');
            $(element).attr('id', ID);

            if (scope.background === undefined || scope.background === null) {
                $(element).css({ 'background': '#fff' });
            } else {
                $(element).css({ 'background': scope.background, 'color' : '#fff' });
            }
            if (scope.option.counter === undefined) scope.option.counter = 0;

            scope.visible = false;

            var _dataSource = null;
            if (scope.option.SQL !== undefined) {

                _dataSource = new DevExpress.data.DataSource({
                    load: function (loadOptions) {
                        var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                        var searchValue = loadOptions.searchValue;
                        var searchExpr = loadOptions.searchExpr != null ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                        var defer = $q.defer();

                        var data = { };
                        if (scope.option.onLoadDataSource !== undefined) {
                            scope.option.onLoadDataSource(data);
                        }

                        if (SearchBox !== null) {
                            var SearchValue = SearchBox.option('value');
                            data.FilterExpr = "SearchExpr LIKE '%" + SearchValue + "%'";
                        }

                        data.showProgress = false;
                        JSDataService.Query(scope.option.SQL,
                            data
                        , skip).then(function (Data) {
                            if (Data.collection == null) Data.collection = [];
                            //console.log(Data.collection);
                            if (scope.option.SQLCount !== undefined) {
                                _.RefreshCount();
                            }
                            defer.resolve(Data.collection);
                        });
                        return defer.promise;
                    },
                    byKey: function (data) {
                        var returnObject = null;
                        if (itemData.defaultItems !== undefined) {
                            returnObject = Enumerable.From(itemData.defaultItems).Where("$.ID == " + data).ToArray()[0];
                        }
                        if (returnObject !== null) return returnObject;

                        var defer = $q.defer();
                        JSDataService.Query(itemData.SQL, {
                            FilterExpr: "ID = " + data
                        }).then(function (Data) {
                            if (Data.collection.length == 0) {
                                data.resolve(null);
                                return;
                            }
                            defer.resolve(Data.collection[0]);
                            if (scope.option.SQLCount !== undefined) {
                                _.RefreshCount();
                            }
                        });
                        return defer.promise;
                    }
                });
            }

            if (scope.option.items !== undefined) {
                _dataSource = scope.option.items;
            }

            var isFunction = function (x) {
                return Object.prototype.toString.call(x) == '[object Function]';
            }

            var SearchBox = null;

            var Popup = null;
            var dxList = null;

            scope.dxPopOverOption = {
                width: scope.option.width === undefined ? 400 : scope.option.width,
                height: scope.option.height === undefined ? 300 : scope.option.height,
                target: element,
                titleTemplate: function (e) {
                    e.css({ 'padding': 0 });
                    return '<div class="js-notif-title" style="background-color:'
                        + scope.background + ';padding:5px;color:#fff;font-size:14px">' + scope.option.title + '</div>';
                },
                contentTemplate: function () {

                    //if (isFunction(scope.option.itemTemplate) === false) {
                    //    var htmlcontent = $('#loadhtml ');
                    //    htmlcontent.load(scope.option.itemTemplate);
                    //    scope.option.itemTemplate = htmlcontent;
                    //}

                    var Html = $('<div style="height:100%"></div>');

                    $('<div class="notif-refresh" style="position:absolute;top:2px;right:5px;color:#fff;font-size:17px"><span class="mdi mdi-refresh"></span></div>').click(function () {
                        if (dxList != null) {
                            $timeout(function () {
                                dxList.reload();
                            }, 700);
                        }
                    }).appendTo(Html);

                    if (scope.option.SearchEnabled === true) {
                        $('<div style="margin-bottom:5px"></div>').dxTextBox({
                            placeholder: 'Search',
                            showClearButton: true,
                            mode: 'search',
                            visible: true,
                            onEnterKey: function () {
                                //alert('xxx');
                                if (dxList != null) {
                                    $timeout(function () {                                      
//                                        console.log(dxList);
                                        dxList.reload();
                                    }, 700);
                                }
                            },
                            onInitialized: function (e) {
                                SearchBox = e.component;
                            }
                        }).appendTo(Html);
                    }
                    
                    $('<div dx-item-alias="itemData"></div>').dxList({
                        dataSource: _dataSource,
                        pullRefreshEnabled : scope.option.SQL !== undefined,
                        itemTemplate: scope.option.itemTemplate,
                        //searchEnabled: true,
                        //searchExpr:  
                        height: '100%',
                        onInitialized: function (e) {
                            v = e.component;
                            dxList = v;
                            if (scope.option.onDxListInitialized !== undefined) {
                                scope.option.onDxListInitialized(v);
                            }
                        },
                        onItemClick: function(e){
                            if (scope.option.onItemClick !== undefined) {
                                scope.option.onItemClick(e);
                            }
                            Popup.hide();
                        }
                    }).appendTo(Html);

                    return Html;
                },
                shadingColor: 'rgba(0, 0, 0, 0.5)',
                showTitle: true,
                onShown: function (e) {
                    if (Popup == null) {
                        Popup = e.component;
                        e.component._$content.addClass('Js-Notif-Popup');
                    }
                    if (scope.option.SQL !== undefined) {
                        if (dxList != null) {
                            $timeout(function () {
                                //alert('xxx');
                                dxList.reload();
                            }, 700);
                        }
                    }
                },
                shading: true,
                bindingOptions: {
                    visible: 'visible'
                },
            }

            //
            //
            //

            //scope.toolTipOption = {
            //    target: '#' + ID,
            //    position: "bottom",
            //    onInitialized: function (e) {
            //        $timeout(function () {
            //            $('#' + ID).unbind().hover(function () {
            //                e.component.show();
            //            }, function () {
            //                e.component.hide();
            //            });
            //        }, 1000);

            //    }
            //};


            scope.dxListOption = {

            };

            scope.onClick = function () {
                scope.visible = !scope.visible;
            }

            //
            //
            //

            
            _.RefreshCount = function () {
                var data = {};
                
                if (scope.option.onLoadDataSource !== undefined) {
                    scope.option.onLoadDataSource(data);
                }
                
                data.showProgress = false;
                JSDataService.Query(scope.option.SQLCount, data).then(function (Data) {

                    

                    if (Data == null) {
                        scope.option.counter = 0;
                        return;
                    }

                    if (Data.collection.length > 0) {
                        scope.option.counter = Data.collection[0].Count;
                    } else {
                        scope.option.counter = 0;
                    }
                });
            }


            if (scope.option.SQL !== undefined) {
                if (scope.option.SQLCount !== undefined) {
                    //$timeout(function () {
                        _.RefreshCount();
                        //console.log('--->', scope.option.SQLCount);
                    //}, 800);
                }
            }
            if (scope.option.onInitialized !== undefined) {
                scope.option.onInitialized(_, element);
            }
        },
        template: '<span class="{{icon}}" ng-click="onClick()"></span>' +
                  '<div class="counter" ng-hide="option.counter===0">{{option.counter}}</div>' +
                  '<div dx-popover="dxPopOverOption"></div>' +
                  '<span class="tooltiptext">{{option.title}}</span>'
    }
}]);