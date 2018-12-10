define(['baseView', 'app'], function (BaseView, app) {
    "use strict"
    var CustomViewController = function () { }

    CustomViewController.prototype.onMenuInitialized = function (e) { }

    CustomViewController.prototype.Init = function ($scope, CurrentObject, ViewStateName, IsModal, ModalMode) {
        BaseView.prototype.Init.call(this, $scope);

        var _ = this;

        _.ActionFilters = {};

        $scope.BaseMenuOptionItems = [];

        $scope.BaseMenuOption = {
            onContentReady: function (e) {
                _.onMenuInitialized(e);
            },
            bindingOptions: {
                'dataSource': 'BaseMenuOptionItems'
            },
            onItemClick: function (e) {
                if (e.itemData.onItemClick !== undefined) {
                    e.itemData.onItemClick();
                    return;
                }
                _.onMenuItemClick(e);
            },
            itemTemplate: function (itemData, itemIndex, itemElement) {
                //
                //  ACTION FILTER
                //
                if (itemData.isActionFilter === true) {
                    $(itemElement).parent().parent().css('float', 'right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');

                    var filterHtml = $('<div class="action-filter-container" style="float:right"><div class="action-filter-caption"><span class="' + (itemData.icon == undefined ? "mdi mdi-filter" : itemData.icon) + '"></span> ' + (itemData.caption === undefined ? '' : itemData.caption) + '</div></div>')

                    if (_.ActionFilters === undefined) _.ActionFilters = {};

                    if (_.ActionFilters[itemData.name] === undefined) {
                        if (itemData.value !== undefined) {
                            if (_.ActionFilters == undefined) _.ActionFilters = {};
                            _.ActionFilters[itemData.name] = itemData.value;
                        }
                    }

                    var dataSource = null;
                    itemData.searchEnabled = true;

                    if (itemData.SQL !== undefined) {
                        dataSource = new DevExpress.data.DataSource({
                            load: function (loadOptions) {
                                //console.log(loadOptions, 'loadopt')
                                var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                                var searchValue = loadOptions.searchValue;
                                var searchExpr = loadOptions.searchExpr != null ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                                var defer = _.$q.defer();

                                var options = { FilterExpr: searchValue == null ? undefined : "Name LIKE '%" + searchValue + "%'" }

                                if (itemData.params !== undefined && itemData.params !== null) {
                                    if ($.isFunction(itemData.params)) {
                                        options.params = itemData.params();
                                    } else {
                                        options.params = itemData.params;
                                    }
                                    //console.log(options.params);
                                }
                                var SQL = null;
                                if ( $.isFunction(itemData.SQL) ) { 
                                    SQL = itemData.SQL();
                                    console.log(SQL);
                                } else {
                                    SQL = itemData.SQL;
                                }
                                
                                _.JSDataService.Query(SQL, options, skip).then(function (Data) {
                                    if (Data.collection == null) Data.collection = [];
                                    if (skip === 0) {
                                        if (itemData.defaultItems !== undefined && itemData.defaultItems !== null) {
                                            $.each(itemData.defaultItems, function (i, c) {
                                                Data.collection.unshift(c);
                                            })
                                        };
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
                                if (returnObject !== null && returnObject !== undefined) return returnObject;

                                var defer = _.$q.defer();
                                var SQL = null;
                                if ($.isFunction(itemData.SQL)) {
                                    SQL = itemData.SQL();
                                    console.log(SQL);
                                } else {
                                    SQL = itemData.SQL;
                                }
                                var Params = null;
                                if (itemData.params !== undefined && itemData.params !== null) {
                                    if ($.isFunction(itemData.params)) {
                                        Params = itemData.params();
                                    } else {
                                        Params = itemData.params;
                                    }
                                    //console.log(options.params);
                                }
                                _.JSDataService.Query(SQL, {
                                    FilterExpr: "ID = " + data,
                                    params: Params
                                }).then(function (Data) {
                                    if (Data.collection.length == 0) {
                                        defer.resolve(null);
                                        return;
                                    }
                                    defer.resolve(Data.collection[0]);
                                });
                                return defer.promise;
                            }
                        });
                        itemData.valueExpr = "ID";
                        itemData.displayExpr = "Name";
                        //itemData.searchEnabled = false;
                    } else {
                        dataSource = itemData.dataSource;
                    }

                    var reloadDataSource = function () {
                        var loadOption = {
                            searchOperation: "contains",
                            searchValue: null,
                            skip: 0,
                            take: 20
                        }
                        dataSource.load(loadOption);
                    }

                    $('<div id="' + itemData.name + '" class="action-filter-box"></div>').dxSelectBox({
                        dataSource: dataSource,
                        reload: reloadDataSource,
                        placeholder: itemData.placeholder,
                        searchEnabled: itemData.searchEnabled,
                        valueExpr: itemData.valueExpr == undefined ? 'id' : itemData.valueExpr,
                        displayExpr: itemData.displayExpr == undefined ? 'name' : itemData.displayExpr,
                        width: (itemData.width === undefined ? '100px' : itemData.width),
                        value: _.ActionFilters[itemData.name] === undefined ? itemData.value : _.ActionFilters[itemData.name],
                        onInitialized: function (e) {
                            _[itemData.name] = e.component;
                        },
                        onValueChanged: function (e) {
                            if (_.ActionFilters == undefined) _.ActionFilters = {};
                            _.ActionFilters[itemData.name] = e.value;
                            _.OnFilterValueChanged(itemData.name, e);
                        }
                    }).appendTo(filterHtml);

                    return filterHtml;
                }

                if (itemData.isActionDateRange === true) {

                    $(itemElement).parent().parent().css('float', 'right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');

                    var filterHtml = $('<div class="action-filter-container"><div class="action-filter-caption"><span class="mdi mdi-calendar"></span> ' + (itemData.caption === undefined ? '' : itemData.caption) + '</div></div>')

                    $('<div id="' + itemData.name + '"></div>').jDxDateRangeBox({
                        value: itemData.value,
                        onInit: function (d) {
                            if (_.ActionFilters == undefined) _.ActionFilters = {};
                            _.ActionFilters[itemData.name] = d;
                        },
                        OnDateValueChanged: function (d) {
                            if (_.ActionFilters == undefined) _.ActionFilters = {};
                            _.ActionFilters[itemData.name] = d;
                            _.OnFilterValueChanged(itemData.name, d);
                        }
                    }).appendTo(filterHtml);

                    return filterHtml;
                }

                if (itemData.align === 'right') {
                    $(itemElement).parent().parent().css('float', 'right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');
                }
                if (itemData.color === undefined && itemData.color == null) {
                    itemData.color = '#767676';
                }
                if (itemData.icon === undefined && itemData.icon == null) {
                    itemData.icon = 'FontInSys';
                }
                if (itemData.text === undefined) {
                    return "<div class='JsContextMenu'><div class='icon-container' style='background:" + itemData.color + "'><span class='" + itemData.icon + "'></span></div></div>";
                }
                //
                //
                //
                return "<div class='JsContextMenu' style='display:table-cell;vertical-align:middle;background:transparent'><div class='item-content'><span style='color:" + itemData.color + "' class='" + itemData.icon + "'></span> <div class='item-caption'>" + itemData.text + "</div></div>";
            }
        };

    };

    CustomViewController.prototype.OnFilterValueChanged = function (e) {

    };

    CustomViewController.prototype.onMenuItemClick = function (e) {

    }


    return CustomViewController;
});