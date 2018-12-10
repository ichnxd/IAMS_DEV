'use strict';

define(['baseView'], function (BaseView) {
    "use strict";
    function BaseTreeViewController() {}

    BaseTreeViewController.prototype = Object.create(BaseView.prototype);

    BaseTreeViewController.prototype.Init = function ($scope) {
        BaseView.prototype.Init.call(this, $scope);
        var _ = this;

        $scope.BaseMenuItem = [];

        $scope.BaseMenuOption = {
            bindingOptions: {
                'dataSource': 'BaseMenuItem'
            },
            itemTemplate: function itemTemplate(itemData, itemIndex, itemElement) {
                //
                //  ACTION FILTER
                //
                if (itemData.isActionFilter === true) {
                    $(itemElement).parent().parent().css('float', 'right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');

                    var filterHtml = $('<div class="action-filter-container" style="float:right"><div class="action-filter-caption"><span class="' + (itemData.icon == undefined ? "mdi mdi-filter" : itemData.icon) + '"></span> ' + (itemData.caption === undefined ? '' : itemData.caption) + '</div></div>');

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
                            load: function load(loadOptions) {
                                var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                                var searchValue = loadOptions.searchValue;
                                var searchExpr = loadOptions.searchExpr != null ? typeof loadOptions.searchExpr === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join() : null;
                                var defer = _.$q.defer();

                                _.JSDataService.Query(itemData.SQL, {
                                    FilterExpr: searchValue == null ? undefined : "Name LIKE '%" + searchValue + "%'"
                                }, skip).then(function (Data) {
                                    if (Data.collection == null) Data.collection = [];
                                    if (itemData.defaultItems !== undefined && itemData.defaultItems !== null) {
                                        $.each(itemData.defaultItems, function (i, c) {
                                            Data.collection.unshift(c);
                                        });
                                    };
                                    defer.resolve(Data.collection);
                                });
                                return defer.promise;
                            },
                            byKey: function byKey(data) {
                                var returnObject = null;
                                if (itemData.defaultItems !== undefined) {
                                    returnObject = Enumerable.From(itemData.defaultItems).Where("$.ID == " + data).ToArray()[0];
                                }
                                if (returnObject !== null && returnObject !== undefined) return returnObject;

                                var defer = _.$q.defer();
                                _.JSDataService.Query(itemData.SQL, {
                                    FilterExpr: "ID = " + data
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
                        itemData.searchEnabled = false;
                    } else {
                        dataSource = itemData.dataSource;
                    }

                    $('<div class="action-filter-box"></div>').dxSelectBox({
                        dataSource: dataSource,
                        placeholder: itemData.placeholder,
                        searchEnabled: itemData.searchEnabled,
                        valueExpr: itemData.valueExpr == undefined ? 'id' : itemData.valueExpr,
                        displayExpr: itemData.displayExpr == undefined ? 'name' : itemData.displayExpr,
                        width: itemData.width === undefined ? '100px' : itemData.width,
                        value: _.ActionFilters[itemData.name] === undefined ? itemData.value : _.ActionFilters[itemData.name],
                        onValueChanged: function onValueChanged(e) {
                            if (_.ActionFilters == undefined) _.ActionFilters = {};
                            _.ActionFilters[itemData.name] = e.value;
                            _.OnFilterValueChanged(itemData.name, e);
                        }
                    }).appendTo(filterHtml);

                    return filterHtml;
                }

                if (itemData.isActionDateRange === true) {

                    var filterHtml = $('<div class="action-filter-container"><div class="action-filter-caption"><span class="mdi mdi-calendar"></span> ' + (itemData.caption === undefined ? '' : itemData.caption) + '</div></div>');

                    $('<div></div>').jDxDateRangeBox({}).appendTo(filterHtml);

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
            },
            onItemClick: function onItemClick(e) {
                if (e.itemData.onItemClick !== undefined) {
                    e.itemData.onItemClick();
                    return;
                }
            }
        };
        //
        //
        //

        _.Refresh = function () {
            $scope.TreeViewData = [];
            _.JSDataService.Query(_.SQL).then(function (data) {
                $.each(data.collection, function (i, c) {
                    if (c !== null) {
                        c.items = Enumerable.From(data.collection).Where('$.' + _.PropertyKey + " == " + c.ID).ToArray();
                    }
                });
                $scope.TreeViewData = Enumerable.From(data.collection).Where('$.' + _.PropertyKey + " == null").ToArray();
                console.log($scope.TreeViewData);
            });
        };

        $scope.SearchTextBoxOption = {
            placeholder: 'Search',
            showClearButton: true,
            mode: 'search',
            visible: true,
            width: 300,
            onInitialized: function onInitialized(e) {
                //SearchBox = e.component;
            }
        };

        var dxTreeViewContextMenu = null;

        $scope.treeViewMenuOptions = {
            onInitialized: function onInitialized(e) {
                dxTreeViewContextMenu = e.component;
            },
            target: '#none',
            items: [],
            onItemClick: function onItemClick(e) {
                //
                //
                //
                console.log(e.itemData);
                var id = e.itemData.id;
                var ID_Parent = dxTreeViewContextMenu.option("ID_Parent");
                switch (id) {
                    case 1:
                        _.JsPopUpView.OpenDetailView(_.ID_DetailView, {
                            ID_CurrentObject: -1,
                            params: {
                                ID_Parent: ID_Parent
                            }
                        });
                        break;
                    case 2:
                        _.JsPopUpView.OpenDetailView(_.ID_DetailView, {
                            ID_CurrentObject: ID_Parent,
                            params: {
                                ID_Parent: null
                            }
                        });
                        break;
                }
            }
        };

        $scope.treeViewOptions = {
            bindingOptions: {
                'dataSource': 'TreeViewData'
            },
            animationEnabled: false,
            onInitialized: function onInitialized(e) {
                _.TreeView = e.component;
                _.Refresh();
            },
            //itemsExpr: '$Childs',
            //keyExpr: _.PropertyKey,
            itemTemplate: function itemTemplate(itemData, itemIndex, itemElement) {
                var html = itemData.Name;
                return html;
            },
            onItemContextMenu: function onItemContextMenu(e) {
                var Items = [];
                var target = e.itemElement;
                var id = target.parent().attr("data-item-id");
                target.attr("id", id);
                dxTreeViewContextMenu.option("target", "#" + id);
                dxTreeViewContextMenu.option("ID_Parent", e.itemData.ID);

                var Name = e.itemData.Name;
                Items.push({ id: 2, text: "Open " + Name, icon: 'mdi mdi-open-in-app' });
                Items.push({ id: 1, text: "Add Item (" + Name + ")", icon: 'mdi mdi-tab-unselected' });
                dxTreeViewContextMenu.option("items", Items);
            }
        };

        //
        //
        //

        if (_.ID_DetailView !== undefined && _.ID_DetailView !== null) {
            $scope.BaseMenuItem.push({
                text: 'New',
                icon: 'mdi mdi-file-outline',
                onItemClick: function onItemClick() {
                    //
                    //
                    //
                    _.JsPopUpView.OpenDetailView(_.ID_DetailView, {
                        ID_CurrentObject: -1,
                        params: {
                            ID_Parent: null
                        }
                    });
                }
            });
        }

        $scope.BaseMenuItem.push({
            text: 'Refresh',
            icon: 'mdi mdi-refresh',
            onItemClick: function onItemClick() {
                _.Refresh();
            }
        });
    };

    return BaseTreeViewController;
});

