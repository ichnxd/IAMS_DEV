define(['baseView'], function (BaseView) {
    "use strict"
    function BaseListViewController() { }

    BaseListViewController.prototype = Object.create(BaseView.prototype);

    BaseListViewController.prototype.Init = function ($scope, ViewStateName,LvModel,ViewAccess) {
        BaseView.prototype.Init.call(this,$scope);

        var IsExport = false;

        //var xxx = 'fasfdsa';
        //console.log(xxx);

        var _ = this;

        _.LvModel = LvModel;
        
        _.ViewAccess = ViewAccess;

        _.$Summary = {};

        _.ID_Model = LvModel.ID_Model;

        _.ID_View = LvModel.ID_View;

        _.ModelName = LvModel.DisplayName;

        _.DisplayName = LvModel.DisplayName;

        _.OwnerRightsField = 'ID_CreatedBy';
        _.OwnerRightsValueField = 'ID';
        //_.$scope = $scope;

        _.$SearValueText = null;

        _.dxSearchBox = null;

        _.$scope.txtSearhBoxOption = {
            placeholder: 'Search ' + _.LvModel.DisplayName,
            mode:'search',
            width:250,
            showClearButton: true,
            onInitialized: function (e) {
                _.dxSearchBox = e.component;
                _.$timeout(function () {
                    _.dxSearchBox.focus();
                }, 500);
            },
            onEnterKey: function () {
                _.Grid.refresh();
            },
            onValueChanged: function (e) {
                _.$SearValueText = e.value;
            }
        };

        $scope.onKeyDown = function (evt) {
            if (evt.altKey == true) {
                if (evt.keyCode === 78) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    if (ViewAccess.IsCanWrite == false) return;
                    _._OpenDetailView(-1);
                } else if (evt.keyCode === 82) {
                    _.Grid.refresh();
                }
            }
        }

        $scope.InitView = function (element) { }

        var clickTimer, lastRowCLickedId;

        var contextMenuListOnly = [];

        var GetFilterString = function (filterArray) {

            var filterString = '';

            $.each(filterArray, function (i, o) {

                if ($.isArray(o)) {

                    filterString += " (" + GetFilterString(o) + ") "

                } else {

                    var value = '';

                    if (i % 2 == 1) {

                        if (o === 'contains' || o === 'startswith' || o === 'endswith') {
                            value = 'LIKE';
                        } else {
                            value = o.toUpperCase();
                        }
                    }

                    if (i === 0) {

                        value = o;

                    } else if (i === 2) {

                        if (jQuery.type(o) === "string") {
                            o = o.replace(/'/g, "''");
                            if (filterArray[1] === 'contains') {
                                value = "'%" + o + "%'"
                            } else if (filterArray[1] === 'startswith') {
                                value = "'" + o + "%'"
                            } else if (filterArray[1] === 'endswith') {
                                value = "'%" + o + "'"
                            } else {
                                value = "'" + o + "'"
                            }
                        } else if (jQuery.type(o) === "date") {


                            value = "'" + moment(o).format("YYYY-MM-DD") + "'"

                        } else if (jQuery.type(o) === "boolean") {

                            if (o == true) {

                                value = "1";

                            } else {

                                value = "0";

                            }

                        } else {

                            value = o;

                        }

                    }

                    filterString += " " + value;
                    
                }


            });


            return filterString;
        }

        _.ToggleHeaderFilter = function () {
            var IsHeaderFilterVisible = _.Grid.option('headerFilter.visible');
            _.Grid.option('headerFilter.visible', !IsHeaderFilterVisible);
        }

        _.ToggleFilterRow = function () {
            var IsFilterRowVisible = _.Grid.option('filterRow.visible');
            _.Grid.option('filterRow.visible', !IsFilterRowVisible);
        }

        _.ToggleGroupPanel = function () {
            var IsGroupPanelVisible = _.Grid.option('groupPanel.visible');
            _.Grid.option('groupPanel.visible', !IsGroupPanelVisible);
        }

        _.Reset = function () {
            _.Grid.clearFilter();
            _.Grid.clearGrouping();
            _.Grid.clearSorting();
        }
        //console.log('ViewAccess', ViewAccess);
        //console.log('isCanWrite', ViewAccess.IsCanWrite);
        if (ViewAccess.IsCanWrite == false) {
            if (_.ButNew !== undefined) _.ButNew.visible = false;
        }

        _.addColumnClass = function (container, valueField, rowObject, _Class) {
            container.addClass(_Class);
        }

        _.addColumnClassMapping = function (container, valueField, rowObject, parentClass, mappings) {
            container.addClass(parentClass);
            var value = rowObject[valueField];
            if (value !== undefined || value !== null) {
                var ClassName = Enumerable.From(mappings).Where('$.ID ===' + value).SingleOrDefault();
                if (ClassName !== undefined && ClassName !== null) {
                    container.addClass(ClassName.Value);
                }
            }
        };

        _.SetOwnerRightsFilter = function () {
            var ListViewFilterString = null;
            if (_.ViewAccess.OwnerRights !== undefined && _.ViewAccess.OwnerRights !== null) {
                //alert('xxxx');
                //console.log(_.ViewAccess.OwnerRights);
                if (_.ViewAccess.OwnerRights[0].IsDeveloper !== 1) {
                    if (_.ViewAccess.OwnerRights.length > 1) {



                        var AllUsers = Enumerable.From(_.ViewAccess.OwnerRights).Where('$.ID === -1000').SingleOrDefault();
                        if (AllUsers == null) {
                            var UsersToAllow = Enumerable.From(_.ViewAccess.OwnerRights).Where('$.IsDeny !== true').ToArray();
                            if (UsersToAllow.length > 1) {
                                if (ListViewFilterString != null) {
                                    ListViewFilterString += " AND ";
                                } else {
                                    ListViewFilterString = '';
                                }
                                ListViewFilterString += " " + _.OwnerRightsField + " IN (" + Enumerable.From(UsersToAllow).Select('$.' + _.OwnerRightsValueField ).ToArray().join() + ")";
                            }
                        }

                        var UsersToDeny = Enumerable.From(_.ViewAccess.OwnerRights).Where('$.IsDeny === true').ToArray();

                        if (UsersToDeny.length > 0) {
                            if (ListViewFilterString != null) {
                                ListViewFilterString += " AND ";
                            } else {
                                ListViewFilterString = '';
                            }
                            ListViewFilterString += " " + _.OwnerRightsField + " NOT IN (" + Enumerable.From(UsersToDeny).Select('$.' + _.OwnerRightsValueField).ToArray().join() + ")";
                        }

                    }
                };
            }
            return ListViewFilterString;
        }

        //
        // CELL TEMPLATE
        //

        var clickTimer, lastRowCLickedId;

        _.$scope.dataGridOptions = {

            dataSource: {

                load : function (loadOptions) {

                    var deferred = _.$q.defer();

                    var isMultipleFilter = false;

                    var ListViewFilterString = null;

                    if (loadOptions.filter != undefined) {
                        ListViewFilterString = "(" + GetFilterString(loadOptions.filter) + ")";
                        //console.log(ListViewFilterString);
                    }

                    var FilterListData = _.Grid.FilterListData;

                    for (var p in FilterListData) {
                        if (FilterListData.hasOwnProperty(p)) {
                            if (FilterListData[p] != null) {
                                if (FilterListData[p].length > 0) {
                                    if (ListViewFilterString != null) ListViewFilterString += " AND ";
                                    ListViewFilterString = (ListViewFilterString == null ? '' : ListViewFilterString) + "[" + p + "] IN (" + FilterListData[p].join(",") + ")";
                                }
                            }
                        }
                    }
                    //console.log(_.ViewAccess);
                    var OwfilterString = _.SetOwnerRightsFilter();
                    if (OwfilterString !== null) {
                        if (OwfilterString.length > 0) {
                            if (ListViewFilterString != null) {
                                ListViewFilterString += " AND ";
                            } else {
                                ListViewFilterString = '';
                            }
                            ListViewFilterString += (' ' + OwfilterString);
                        }
                    }
                    

                    var SortingExpr = null;

                    if (loadOptions.sort !== undefined && loadOptions.sort !== null) {
                        $.each(loadOptions.sort, function (i, o) {
                            SortingExpr = o.selector + " " + (o.desc === true ? "DESC" : "");
                        });
                    }

                    var ColumnExpr = Enumerable.From(_.$SearchColumns).Where('$.ID ===' + _.$scope.ColumnSearchExpr).SingleOrDefault();
                    
                    //
                    //
                    //

                    var data = {

                        ID: LvModel.ID_ModelObject,

                        ViewName: LvModel.ModelViewName,

                        skip: loadOptions.skip == undefined ? 0 : loadOptions.skip,

                        //skip: 60,

                        IsExport: IsExport,

                        filter: ListViewFilterString,

                        FilterString: (_.$scope.FilterString !== undefined ? _.$scope.FilterString : null),

                        SortingExpr: SortingExpr,

                        FullTextSearch: _.$SearValueText,

                        pageSize: _.LvModel.PageSize,

                        DataSource: LvModel.DataSource,

                        IsOwner: _.IsHasCreatedByColumn === true && ViewAccess.IsOwner === true,

                        ColumnSearhOption: ColumnExpr.ID === -1 ? undefined : ColumnExpr.PropertyName

                    };

                    //console.log('before load',data);

                    //
                    //
                    //
                    //_.$timeout(function () {

                        if (_.ModelHelper !== undefined && _.ModelHelper.onCollectionSource_Load !== undefined) {
                            if (data.WhereCriteria == undefined) data.WhereCriteria = [];
                            _.ModelHelper.onCollectionSource_Load(data);
                            if (data.WhereCriteria.length > 0) {
                                data.FilterString = data.WhereCriteria.join(" AND ");
                                //console.log(data.FilterString);
                            }
                        }

                        if (_.ViewHelper !== undefined && _.ViewHelper.onCollectionSource_Load !== undefined) {
                            if (data.WhereCriteria == undefined) data.WhereCriteria = [];
                            _.ViewHelper.onCollectionSource_Load(data);
                            if (data.WhereCriteria.length > 0) {
                                data.FilterString = data.WhereCriteria.join(" AND ");
                                //console.log(data.FilterString);
                            }
                        }

                        var SummaryColumns = [];

                        if (_.$scope.dataGridOptions.summary.totalItems.length > 1) {
                            for (var i = 1; i < _.$scope.dataGridOptions.summary.totalItems.length ; i++) {
                                var summary = _.$scope.dataGridOptions.summary.totalItems[i];
                                SummaryColumns.push({
                                    name: summary.showInColumn,
                                    operator: summary.type + "(" + summary.showInColumn + ")"
                                });
                            }
                            data.SummaryColumns = JSON.stringify(SummaryColumns);
                        }

                        _.JSDataService.GetDataSet('ListView/GetDataSet', data).then(function (Data) {

                            _.$timeout(function () {

                                if (Data.summaries != null) {

                                    _.TotalRecordCount = Data.summaries.RecordCount;

                                    $.each(SummaryColumns, function (i, s) {
                                        _.$Summary[s.name] = Data.summaries[s.name];
                                    });

                                }

                                if (IsExport == true) IsExport = false;

                                deferred.resolve(Data.collection);

                            }, 100)
                        

                    //}, 3000);
                    

                    }, function () {

                        deferred.reject(null);

                    });

                    return deferred.promise;
                }, totalCount: function () {

                    return 0;

                }
            },
            noDataText: "",
            //height: function () {
            //    var ViewHeaderHeight = $(this).parent().parent().find('.view-header').height();
            //    return $(this).parent().height() - ViewHeaderHeight - 3;
            //},
            height: '100%',
            scrolling: {
                mode: "infinite"
            },
            sorting: {
                mode : "single"
            },
            "export": {
                fileName: LvModel.ModelName + '' + moment(new Date()).format('MMDDYYYYHHmm')
            },
            loadPanel: {
                enabled: false
            },
            //showColumnLines: false,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            columnChooser: {
                height: 400,
                width: 250,
            },
            stateStoring: {
                enabled: false,
                type: "localStorage",
                storageKey: LvModel.ModelName + "storage" + LvModel.ID,
            },
            customizeColumns: function (columns) {

                _.onCustomizeColumns(columns);

                $.each(columns, function (i, c) {

                    c.showWhenGrouped = false;

                    if (c.dataField === undefined) return;
                    //console.log("dataField",c.caption);
                    if (c.dataField === "ID" || c.caption === "ID") {
                        //alert('xx');
                        c.caption = "ID";
                        c.allowHiding = false
                        c.allowGrouping = false;
                        c.allowReordering = false;
                        c.allowResizing = false;
                        //alert(_.IsDeveloperMode);
                        if (_.IsDeveloperMode !== true) {
                            c.visible = false;
                        }
                        c.allowHiding = false;
                    } else {
                        if (_.LvModel.firstColumn === c.dataField) {
                            //alert(c.dataField);
                            //c.width = 300;
                        }
                    }

                    if (c.dataField === "ID" || c.dataField === _.$SummaryColumnName) {
                        return;
                    };

                    c.allowFixing = true;
                    c.allowResizing = true;

                    if (c.width >= 0 && c.width <= 70) {
                        c.width = c.width + 30;
                    }

                    if (c.dataType === 'date') {
                        if (c.format !== null && c.format !== undefined) {
                            c.cellTemplate = function (container, options) {
                                var d = options.data[c.dataField];
                                //console.log('===> Value',d);
                                //console.log('===> Date',new Date(d));
                                if (!!d) {
                                    container.html(Globalize.format(new Date(d), c.format));
                                } else {
                                    container.html('');
                                }   
                            }
                        }
                    }

                });

                var LastColumn = Enumerable.From(columns).Where('$.visible == true && $.fixed !== true').OrderByDescending("$.visibleIndex").ToArray();
                LastColumn[0].width = undefined;
                //alert(LastColumn[0].dataField);
                //var gridWidth = _.Grid._$element.parent().parent().parent().width();                
                //var ColumnWidths = LastColumn.SUM('width');

                //if (gridWidth > ColumnWidths) {
                //    if (LastColumn.length > 0) {
                //        //LastColumn[0].width = undefined;
                //    }
                //}
            },
            remoteOperations: {
                filtering: true,
                paging: true,
                summary: true,
                sorting : true
            },
            paging: {
                pageSize: _.LvModel.PageSize
            },
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: LvModel.IsModal ? (LvModel.IsSingleSelect ? "onLongTap" : "always") : "onLongTap"
            },
            onCellHoverChanged: function (e) {

            },
            onKeyDown: function (e) {
                
                if (e.jQueryEvent.keyCode == 27) {
                    e.component.clearSelection();
                    //
                    //
                    //

                    //console.log('esc',e.component);
                }
                if (e.jQueryEvent.keyCode == 13) {
                    var SelectedData = e.component.getSelectedRowsData();
                    if (SelectedData.length !== 1) return;

                    _._OpenDetailView(SelectedData[0].ID, SelectedData[0]);

                }

                if (e.jQueryEvent.keyCode == 38 || e.jQueryEvent.keyCode == 40) {
                    var selKey = e.component.getSelectedRowKeys();
                    if (selKey.length) {
                        var currentKey = selKey[0];
                        var index = e.component.getRowIndexByKey(currentKey);
                        if (e.jQueryEvent.keyCode == 38) {
                            index--;
                            if (index >= 0) {
                                e.component.selectRowsByIndexes([index]);
                                e.jQueryEvent.stopPropagation();
                            }
                        }
                        else if (e.jQueryEvent.keyCode == 40) {
                            index++;
                            e.component.selectRowsByIndexes([index]);
                            e.jQueryEvent.stopPropagation();
                        }
                    }
                }
                
                //var selKey = e.component.getSelectedRowKeys();
                //if (selKey.length) {
                //    var currentKey = selKey[0];
                //    var index = e.component.getRowIndexByKey(currentKey);
                //    if (e.jQueryEvent.keyCode == 38) {
                //        index--;
                //        if (index >= 0) {
                //            e.component.selectRowsByIndexes([index]);
                //            e.jQueryEvent.stopPropagation();
                //        }
                //    }
                //    else if (e.jQueryEvent.keyCode == 40) {
                //        index++;
                //        e.component.selectRowsByIndexes([index]);
                //        e.jQueryEvent.stopPropagation();
                //    }
                //}
            },
            rowAlternationEnabled: false,
            showRowLines : true,
            summary: {
                totalItems: [],
            },
            hoverStateEnabled : true,
            showBorders: true,
            allowColumnReordering: true,
            wordWrapEnabled: _.LvModel.IsWordWrap,
            filterRow: {
                visible: true,
                applyFilter: "onClick"
            },
            headerFilter: {
                visible: false
            },
            onInitialized: function (e) {

                _.Grid = e.component;
                _.Grid.FilterListControl = [];
                _.Grid.clearSorting();

                _.$timeout(function () {
                    _.Grid.clearFilter();
                }, 500);
                

                //_.Grid.focus();

                if (_.ModelHelper != undefined) {
                    _.ModelHelper.Grid = _.Grid;
                }

                if (_.ViewHelper != undefined) {
                    _.ViewHelper.Grid = _.Grid;
                }

                _.Grid.clearSelection();

                _.$scope.$Tab.$Refresh = function () {
                    _.$timeout(function () {
                        _.Grid.refresh();
                    }, 300);
                }

                if (_.$scope.RepaintView === true) {
                    _.$scope.RefreshView = function () {

                        _.$timeout(function () {

                            _.Grid.repaint();

                        });
                    
                    }
                }

                //_.Reset();
                _.RefreshToolbar();

            },
            onEditorPreparing: function(e) {
                if (e.parentType == 'filterRow') {
                    e.editorOptions.onEnterKey = function (arg) {
                        e.element.find('.dx-apply-button').trigger('dxclick');
                    }
                }
            },
            onSelectionChanged: function (e) {
                var Count = e.selectedRowKeys.length;
                if (Count === 1) {
                    var scrollable = e.component.getView('rowsView')._scrollable;
                    var selectedRowElements = e.component.element().find('tr.dx-selection');
                    scrollable.scrollToElement(selectedRowElements);
                }

                if (Count > 0) {
                    _.$scope.CurrentObject = e.selectedRowKeys[Count - 1];
                } else {
                    _.$scope.CurrentObject = null;
                }
                _.RefreshToolbar();
            },
            onRowClick: function (e) {

                var component = e.component;

                if (!component.clickCount)
                    component.clickCount = 1;
                else
                    component.clickCount = component.clickCount + 1;


                if (component.clickCount == 1)
                {
                    component.lastClickTime = new Date();

                    setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
                }
                else if (component.clickCount == 2)
                {
                    if (((new Date()) - component.lastClickTime) < 300)
                    {
                        if (e.data !== undefined) {
                            _._OpenDetailView(e.data.ID, e.data);
                            if (_.$scope.ClosePopup != undefined) {
                                _.$scope.ClosePopup();
                            }
                        }

                    }
                    component.clickCount = 0;
                    component.lastClickTime = 0;
                }

            },
            onOptionChanged: function (e) {
                //console.log('onOptionChanged',e);
            },
            //columnResizingMode: 'nextColumn',
            onContentReady: function (e) {

                if (_.$isHasMaxHeight == undefined) {
                    var RowsView = e.element.find('.dx-datagrid-rowsview');
                    var h = RowsView.height() - 65;
                    //var h = RowsView.height();
                    RowsView.css({ 'min-height': h, 'max-height': h });
                    _.$isHasMaxHeight = h;
                }
               
            },
            onContextMenuPreparing: function (e) {
                
                if (e.items == null) e.items = [];

                $.each(e.items, function (i, item) {
                    if (item.text == undefined) {
                        switch (item.value) {
                            case "asc":
                                item.text = "Sort Ascending";
                                break;
                            case "desc":
                                item.text = "Sort Descending";
                                break;
                            case "none":
                                item.text = "Clear Sorting";
                                break;
                        }
                    }
                });

                e.jQueryEvent = {};
                if (window.event !== undefined) {
                    e.jQueryEvent.ctrlKey = window.event.ctrlKey;
                }
                
                if (e.jQueryEvent.ctrlKey == true) { 

                    if (_.IsDeveloperMode == true) {

                        e.items = [];

                        e.items.push({
                            align: 'right', text: 'Developers Mode', icon: 'mdi mdi-codepen', color: '#588C7E',
                            items: [
                                {
                                    text: 'Edit ' + _.LvModel.ModelViewName, icon: 'icon mdi mdi-border-outside', onItemClick: function () {

                                        _.EditListViewControl(_.LvModel.ID_ModelObject);

                                    }
                                },
                                {
                                    text: 'Edit ' + _.LvModel.DisplayName + ' Model', icon: 'icon mdi mdi-arrange-send-backward', onItemClick: function () {

                                        _.EditModelObject(_.LvModel.ID_Model);

                                    }
                                },
                                {
                                    text: 'Save Format', icon: 'icon mdi mdi-content-save', onItemClick: function () {
                                        _.SaveListViewFormat(_.LvModel.ModelViewName, _.Grid.state(), _.LvModel.ID_ModelObject);

                                    }
                                },
                                {
                                    text: 'Batch Edit (' + LvModel.ModelViewName + ')', icon: 'icon mdi mdi-table-large', onItemClick: function () {

                                        _.EditOnSQLView(1, _.LvModel.ID_ModelObject);
                                    }
                                },
                                {
                                    text: 'Batch Edit (' + LvModel.DisplayName + ')', icon: 'icon mdi mdi-table-large', onItemClick: function () {

                                        _.EditModelOnSQLView(_.LvModel.ID_Model);
                                    }
                                },
                                {
                                    text: 'View Model Script', icon: 'icon mdi mdi-script', isDeveloperMode: true, onItemClick: function () {
                                        _.ViewModelScript();
                                    }
                                },
                                {
                                    text: 'Publish Js', icon: 'mdi mdi-language-javascript', isDeveloperMode: true, onItemClick: function () {
                                        _.ConfirmBox('Do you want to publish script?', 'ListView').then(function () {
                                            var $http = angular.element(document).injector().get('$http');
                                            $http.get('/JsApp/ListView?ID=' + _.LvModel.ID_ModelObject + '&ViewName=' + _.LvModel.ModelViewName + '&isMinify=1').then(function (r) {
                                                _.JSDataService.Post('/JsApp/PublishJs', {
                                                    ID_View: _.LvModel.ID_ModelObject,
                                                    Script: r.data,
                                                    ViewName: _.LvModel.ModelViewName,
                                                    ID_ViewType: 1
                                                }).then(function () {

                                                });

                                            });
                                        });
                                    }
                                }
                            ]
                        });


                        e.items.push({
                            icon: 'mdi mdi-settings-box', align: 'right', text: 'Settings',
                            items: [
                                {
                                    text: 'Toggle Header Filter', onItemClick: function () {
                                        _.ToggleHeaderFilter();
                                    }
                                },
                                {
                                    text: 'Toggle Filter Row', onItemClick: function () {
                                        _.ToggleFilterRow();
                                    }
                                },
                                {
                                    text: 'Toggle Group Panel', onItemClick: function () {
                                        _.ToggleGroupPanel();
                                    }
                                },
                                //{
                                //    text: 'Clear Filter', onItemClick: function () {
                                //        _.Grid.clearFilter()
                                //    }
                                //},
                                {
                                    text: 'Clear Sorting', onItemClick: function () {
                                        _.Grid.clearSorting();
                                    }
                                },
                                {
                                    text: 'Clear Grouping', onItemClick: function () {

                                        _.Grid.clearGrouping();
                                    }
                                },
                                {
                                    text: 'Reset', onItemClick: function () {
                                        _.Reset();
                                    }
                                },
                            ]
                        });

                        e.items.push({
                            align: 'right', icon: 'jspp-icon js-list', text: 'Column Chooser', color: '#008bba', onItemClick: function () {
                                _.Grid.showColumnChooser();
                            }
                        });

                        e.items.push({
                            text: 'Edit Column (' + e.column.caption + ')',
                            icon: 'mdi mdi-table-column-width',
                            onItemClick: function () {
                                _.JsPopUpView.OpenDetailView(21, {
                                    ID_CurrentObject: e.column.ID_Column,
                                    fullScreen: true
                                });
                            }
                        });

                        if (e.column.ID_ModelProperty !== undefined) {
                            e.items.push({
                                text: 'Edit Property (' + e.column.caption + ')',
                                icon: 'mdi mdi-cube',
                                onItemClick: function () {
                                    _.JsPopUpView.OpenDetailView(15, {
                                        ID_CurrentObject: e.column.ID_ModelProperty,
                                        fullScreen: true
                                    });
                                }
                            });
                        }

                        return;

                    }

                }

                if (e.row != undefined) {

                    if (e.row.rowType === "data") {


                        var defaultItems = [
                            {
                                text: "Open in new tab",
                                icon: "mdi mdi-tab",
                                //template: "contextItem" ,
                                onItemClick: function () {

                                    _._OpenDetailView(e.row.data.ID, e.row.data);
                                    if (_.$scope.ClosePopup != undefined) {
                                        _.$scope.ClosePopup();
                                    }
                                }
                            },
                             {
                                 text: "Open in new window",
                                 icon: "mdi mdi-window-restore",
                                 //template: "contextItem",
                                 onItemClick: function () {
                                     _.OpenOnNewWindowByID(_.LvModel.ID_ModelDetailView, e.row.data.ID, { fullScreen : true }).then(function () {

                                         _.$timeout(function () {

                                             _.Grid.refresh();

                                         }, 100);

                                     } );
                                 }
                             }
                        ];
                        
                        $.each(defaultItems, function (i, t) {
                            if (e.items == null) e.items = [];
                            e.items.push(t);
                        });

                        var ContextMenus = Enumerable.From(_.$scope.ContextMenuItems).Where("$.isContextMenu == true").ToArray();

                        if (_.onContextMenuPreparing != undefined) {
                            _.onContextMenuPreparing(e);
                        }

                        if (ContextMenus.length > 0) {
                            $.each(ContextMenus, function (i, c) {
                                if (c.onItemClick === undefined) {
                                    if (_.onMenuItemClick !== undefined) {
                                        c.onItemClick = function () {        
                                            _.onMenuItemClick(c);
                                        }
                                    }
                                }
                                //if (c.items !== undefined) {
                                //    setMenuItemOnClick(c.items);
                                //}
                                e.items.push(c);
                            });
                        }

                        //
                        //
                        //

                        $.each(contextMenuListOnly, function (i, cm) {
                            var IsNotAvailable = true;
                            if (cm.IsDisabled != undefined) {
                                IsNotAvailable = cm.IsDisabled(_);
                            }
                            if (IsNotAvailable == true) return;
                            e.items.unshift(cm);
                        });

                        if (_.$CanUpdateReference === true) {
                            e.items.push({
                                text: 'Update Reference',
                                icon: 'mdi mdi-filter-remove',
                                onItemClick: function () {
                                    _.JsPopUpView.UpdateObjectReference({
                                        SQL: _.LvModel.DataSource,
                                        ID_CurrentObject: e.row.data.ID,
                                        Name: e.row.data.Name,
                                        ID_Model: _.ID_Model,
                                        SQLUpdateProc: _.LvModel.SQLUpdateProc
                                    });
                                }
                            });
                        }

                    }
                }

                e.items.push({
                    text: "Refresh",
                    icon: "fa fa-refresh",
                    //template: "contextItem",
                    onItemClick: function () {
                        _.Grid.refresh();
                    }
                });

                e.items.push({
                    text: "Export to xls",
                    icon: "fa fa-file-excel-o",
                    //template: "contextItem",
                    onItemClick: function () {
                        IsExport = true;
                        _.Grid.exportToExcel(false);
                    }
                });

                
            },
            //
            //  FILTER
            //
            onRowPrepared: function (info) {
                if (_.onRowPrepared !== undefined) _.onRowPrepared(info);
            },
            onCellPrepared: function (e) {
                if (e.column.command === 'expand') return;
                if (e.rowType === 'filter') {
                    if (e.column.SQL !== undefined) {
                        e.cellElement.html(
                            $('<div/>').dxListViewBox(
                                {
                                    SQL: e.column.SQL,
                                    placeholder: (e.column.placeholder !== undefined ? e.column.placeholder : 'Find ' + e.column.caption + '...'),
                                    IsMultiSelect: true,
                                    ModelOption : e.column.ModelOption,
                                    onInitialized: function (e) {
                                        //console.log('filter list', e);
                                        //alert('filter list');
                                        _.Grid.FilterListControl.push(e.component);
                                    },
                                    OnItemSelected: function (values) {
                                        if (_.Grid.FilterListData === undefined) _.Grid.FilterListData = {};
                                        var columnName = e.column.refDataField !== undefined ? e.column.refDataField : e.column.dataField;
                                        if (values != null) {
                                            if (values.length > 0) {
                                                
                                                _.Grid.FilterListData[columnName] = Enumerable.From(values).Select('$.ID').ToArray();
                                                _.$timeout(function () {
                                                    _.Grid.refresh();
                                                }, 100);
                                                return;
                                            }
                                        }
                                        _.Grid.FilterListData[columnName] = null;
                                        if (_.IsGridRefresh !== false) {
                                            _.$timeout(function () {
                                                _.Grid.refresh();
                                            }, 100);
                                        }
                                    }
                                }
                            )
                        );
                    }
                }
            }
        };

        $scope.FilterMenuItems = [];

        _.AddActionFilter = function (actionFilter) {
            actionFilter.isActionFilter = true;
            _.$scope.FilterMenuItems.push(actionFilter);
        };

        _.AddDateFilter = function (actionFilter) {
            actionFilter.isActionDateRange = true;
            _.$scope.FilterMenuItems.push(actionFilter);
        };

        if (_.$isAllowEdit == 1 && _.$isAllowDelete == 1) {
            var ButDelete = {
                ID: 2, text: 'Delete', icon: 'mdi mdi-close', onItemClick: function () {
                    _.PerformDelete();
                }
            };
            _.$scope.ContextMenuItems.push(ButDelete);
        }

        _.$scope.ContextMenuItems.push({ ID: 3, color: '#588c73', text: 'Refresh', icon: 'mdi mdi-refresh' });
        //_.$scope.ContextMenuItems.push({ ID: 4, text: 'Export', icon: 'fa fa-file-excel-o' });
        
        //
        //
        //

        _.ActionFilters = { };
        _.$scope.FilterContextMenuOption = {
            bindingOptions: {
                'dataSource': 'FilterMenuItems'
            },
            itemTemplate: function (itemData, itemIndex, itemElement) {
                //
                //  ACTION FILTER
                //
                if (itemData.isActionFilter === true) {
                    $(itemElement).parent().parent().css('float', 'right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');

                    var filterHtml = $('<div class="action-filter-container"><div class="action-filter-caption"><span class="mdi mdi-filter"></span> ' + (itemData.caption === undefined ? '' : itemData.caption) + '</div></div>')

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
                                var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                                var searchValue = loadOptions.searchValue;
                                var searchExpr = loadOptions.searchExpr != null ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                                var defer = _.$q.defer();

                                var params = null;
                                if (itemData.params !== undefined && itemData.params !== null) {
                                    if ($.isFunction(itemData.params)) {
                                        params = itemData.params();
                                    } else {
                                        params = itemData.params;
                                    }
                                    //console.log(options.params);
                                }
                                
                                var SQL = null;
                                if ($.isFunction(itemData.SQL)) {
                                    SQL = itemData.SQL();
                                    console.log(SQL);
                                } else {
                                    SQL = itemData.SQL;
                                }
                                
                                _.JSDataService.Query(SQL, {
                                    FilterExpr: searchValue == null ? undefined : "Name LIKE '%" + searchValue + "%'",
                                    params: params, //itemData.params
                                }, skip).then(function (Data) {
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
                                if (returnObject !== null) return returnObject;

                                var defer = _.$q.defer();
                                _.JSDataService.Query(itemData.SQL, {
                                    FilterExpr: "ID = " + data
                                }).then(function (Data) {
                                    if (Data.collection.length == 0) {
                                        data.resolve(null);
                                        return;
                                    }
                                    defer.resolve(Data.collection[0]);
                                });
                                return defer.promise;
                            }
                        });
                        itemData.valueExpr = "ID";
                        itemData.displayExpr = "Name";
                        itemData.searchEnabled = true;
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

                    $('<div class="action-filter-box"></div>').cmSelectBox({
                        dataSource: dataSource,
                        reload: reloadDataSource,
                        placeholder: itemData.placeholder,
                        searchEnabled: true,
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
                            _.Grid.refresh();
                        }
                    }).appendTo(filterHtml);

                    return filterHtml;
                }

                if (itemData.isActionDateRange === true) {

                    var filterHtml = $('<div class="action-filter-container"><div class="action-filter-caption"><span class="mdi mdi-calendar"></span> ' + (itemData.caption === undefined ? '' : itemData.caption) + '</div></div>')

                    $('<div></div>').jDxDateRangeBox({}).appendTo(filterHtml);

                    return filterHtml;
                }
            }
        };

        _.$scope.GridContextMenuOption = {
            bindingOptions: {
                'dataSource': 'ContextMenuItems'
            },
            itemTemplate: function (itemData, itemIndex, itemElement) {
                if ( itemData.align === 'right' ) {
                    $(itemElement).parent().parent().css('float','right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');
                }
                if (itemData.color === undefined && itemData.color == null) {
                    itemData.color = '#767676';
                }
                if (itemData.icon === undefined && itemData.icon == null) {
                    //itemData.icon = 'FontInSys';
                    itemData.icon = 'mdi mdi-file-outline';
                }
                if ( itemData.text === undefined ) { 
                    return "<div class='JsContextMenu'><div class='icon-container' style='background:" + itemData.color + "'><span class='" + itemData.icon + "'></span></div></div>";
                }
                //
                //
                //
                return "<div class='JsContextMenu' style='display:table-cell;vertical-align:middle;background:transparent'><div class='item-content'><span style='color:" + itemData.color + "' class='" + itemData.icon + "'></span> <div class='item-caption'>" + itemData.text + "</div>" + (itemData.items !== undefined && itemData.items !== null ? '<span class="fa fa-caret-down"></span>' : '') + "</div>";
            },
            displayExpr: "text",
            onInitialized: function (e) {
                $.each(e.component._options.items, function (i, o) {
                    if (o.disabled === undefined) o.disabled = false;
                });
                _.MainToolbar = e.component;
            },
            onItemClick: function (data) {
                if (data.itemData.onItemClick !== undefined) {
                    var itemSelected = Enumerable.From(_.Grid.getSelectedRowsData()).ToArray();
                    
                    data.itemData.onItemClick(itemSelected);
                    return;
                }
                switch (data.itemData.ID) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        _.OnToolbarButtonClick(data.itemData.ID);
                        break;
                    case -1002:
                        _.EditListViewControl(_.LvModel.ID_ModelObject);
                        break;
                    case -1003:
                        _.EditModelObject(_.LvModel.ID_Model);
                        break;
                    default:
                        _.OnToolbarButtonClick(data.itemData.ID);
                        break;
                }
                //
                //
                //
                if (_.onMenuItemClick !== undefined) {
                    _.onMenuItemClick(data);
                }
            }
        }

        _.GetSelectedRows = function () {
            return _.Grid.getSelectedRowsData();
        }

        _.RefreshToolbar = function () {

            var Items = _.MainToolbar.option('dataSource');

            $.each(Items, function (i, tbar) {

                if (tbar.isActionFilter === true) return;
                
                if (tbar.requireMultipleObject != undefined) {
                    if (tbar.requireMultipleObject === true) {
                        if (_.Grid.getSelectedRowsData().length == 0) {
                            tbar.disabled = true;
                            return;
                        } else {
                            tbar.disabled = false;
                        }
                    }
                }

                if (tbar.IsDisabled !== undefined) {
                    if (tbar.requireMultipleObject === true) {
                        if (_.Grid.getSelectedRowsData().length == 0) {
                            tbar.disabled = true;
                        } else {
                            tbar.disabled = tbar.IsDisabled(_.Grid.getSelectedRowsData());
                        }
                    } else {
                        tbar.disabled = tbar.IsDisabled(_.Grid.getSelectedRowsData());
                    }
                }

            });

            _.MainToolbar.repaint();
        }

        _.OnToolbarButtonClick = function (id) {
            switch (id) {
                case 1:
                    _._OpenDetailView(-1);
                    break;
                case 2:
                    //
                    // DELETE
                    //
                    _.PerformDelete();
                    break;
                case 3:
                    _.Grid.refresh();
                    break;
                case 4:
                    IsExport = true;
                    _.Grid.exportToExcel(false);
                    break;
            }
        }

        _.PerformDelete = function () {
            var ItemSelecteds = _.Grid.getSelectedRowsData();
            if (ItemSelecteds.length === 0) return;
            //
            //
            //
            _.DeleteModelObjects(ItemSelecteds).then(function () {
                _.Grid.refresh();
            });
        }

        _.AddToolbarButton = function (button) {
            if (button.isContextMenuOnly === true) {
                contextMenuListOnly.push(button);
                return;
            }
            _.$scope.ContextMenuItems.push(button);
        }

        _.AddButtonReport = function (reportData, isContextMenuOnly) {
            if (isContextMenuOnly === true) {
                var menuReport = Enumerable.From(contextMenuListOnly).Where("$.ID == " + -10099).SingleOrDefault();
                if (menuReport == undefined || menuReport == null) {
                    menuReport = {
                        ID: -10099,
                        text: 'Report',
                        icon: 'mdi mdi-note-outline',
                        color: '#767676',
                        disabled: false,
                        items: []
                    };
                    contextMenuListOnly.push(menuReport);
                }
                menuReport.items.push({
                    text: reportData.Name,
                    reportData: reportData,
                    icon: 'mdi mdi-note-outline',
                    IsDisabled : reportData.IsDisabled,
                    onItemClick: function () {
                        var SelectedRows = _.Grid.getSelectedRowsData();
                        if (SelectedRows.length == 0) return;
                        var _report = this.reportData;
                        var CurrentObject = SelectedRows[0];
                        if (reportData.isValid !== undefined) {
                            if (reportData.isValid(CurrentObject) === false) return;
                        }
                        _.ViewReport(CurrentObject.ID, _report.ID_Report, CurrentObject.Name, {
                            ID: CurrentObject.ID
                        } );
                    }
                });
                return;
            }

            var menuReport = Enumerable.From(_.$scope.ContextMenuItems).Where("$.ID == " + -10099).SingleOrDefault();
            
            if (menuReport == undefined || menuReport == null) {
                menuReport = {
                    ID: -10099,
                    text: 'Reports',
                    icon: 'mdi mdi-note-outline',
                    color: '#3c763d',
                    disabled: false,
                    isContextMenu : true,
                    items: []
                };
                _.$scope.ContextMenuItems.push(menuReport);
            }
            menuReport.items.push({
                text: reportData.Name,
                reportData : reportData,
                icon: 'jspp-icon js-file-2',
                onItemClick: function () {
                    var _report = this.reportData;
                    var SelectedRows = _.Grid.getSelectedRowsData();
                    if (_report.requireSingleObject == undefined) _report.requireSingleObject = false;
                    if (_report.requireSingleObject === true) {
                        if (SelectedRows.length == 0) {
                            _.MsgBox("Nothing selected");
                            return;
                        }
                        if (reportData.IsMultiSelect == undefined || reportData.IsMultiSelect == null) {
                            if (SelectedRows.length > 1) return;
                        }
                    }
                    var CurrentObject = SelectedRows[0];
                    _.ViewReport(CurrentObject.ID, _report.ID_Report, CurrentObject.Name, {
                        ID: (reportData.IsMultiSelect === undefined ? CurrentObject.ID : Enumerable.From(SelectedRows).Select('$.ID').ToArray())
                    });
                }
            });
        }

        _.EditDetailViewControl = function (ID_DetailView) {
            this.JsPopUpView.OpenDetailView(13, {
                ID_CurrentObject: ID_DetailView,
                fullScreen: true
            });
        }

        _.EditListViewControl = function (ID_ListView) {
            this.JsPopUpView.OpenDetailView(14, {
                ID_CurrentObject: ID_ListView,
                fullScreen: true
            });
        }

        _.EditModelObject = function (ID_Model) {
            this.JsPopUpView.OpenDetailView(4, {
                ID_CurrentObject: ID_Model,
                fullScreen: true
            });
        }



        var getRandomInt = function () {
            var min = 1000, max = 999999;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        _._OpenDetailView = function (ID_CurrentObject, CurrentObject) {
            //console.log(CurrentObject);
            var ListViewModel = this.LvModel;

            var _IDTab = ID_CurrentObject === -1 ? -1 * getRandomInt() : ListViewModel.ID_ModelDetailView * 1000 * ID_CurrentObject;

            var $body = angular.element(document.body);

            var $rootScope = $body.injector().get('$rootScope');

            //console.log('ListViewModel--->', ListViewModel);

            var data = {

                ID: _IDTab,
                Caption: ListViewModel.DisplayName,
                ID_ViewType: 2,
                ViewID: ListViewModel.ID_ModelDetailView,
                ID_CurrentObject: ID_CurrentObject,
                ImageName: ListViewModel.Icon,
                ListViewTab: {
                    ID_View: ListViewModel.ID_ModelObject,
                    ID_Tab: ListViewModel.ID_Tab
                },
                $onCurrentObjectSaved: function (CurrentObject) {
                    //_.Grid.refresh();
                    _.$scope.$Tab.$dirty = true;
                }

            };

            if (_.OnOpenDetailView !== undefined) {
                _.OnOpenDetailView(data, CurrentObject);
            }

            //
            //
            //
            if (_.ModelHelper != undefined && _.ModelHelper !== null) {
                if (_.ModelHelper.OnOpenDetailView !== undefined) {
                    _.ModelHelper.OnOpenDetailView(data, CurrentObject);
                }
            }
            
            if (_.ViewHelper !== undefined && _.ViewHelper !== null) {
                if (_.ViewHelper.OnOpenDetailView !== undefined) {
                    _.ViewHelper.OnOpenDetailView(data, CurrentObject);
                }
            }

            $rootScope.$emit("CallNewTabMethod", data);

        }

        if (_.$scope.ModalMode != null) {

            var ModalMode = _.$scope.ModalMode;

            if (ModalMode.SingleSelect === true) {

                _.$scope.dataGridOptions.selection.mode = 'single';
                _.$scope.dataGridOptions.selection.showCheckBoxesMode = 'onLongTap';
                _.$scope.dataGridOptions.onRowClick = function (e) {

                    var CurrentObject = e.data;

                    if (e.isSelected) {
                        if (_.$scope.OnLookUpListViewItemSelected != undefined) {
                            _.$timeout(function () {
                                _.$scope.OnLookUpListViewItemSelected(e.data);
                            });
                        }
                    }


                }
            } else {

                _.$scope.dataGridOptions.selection.showCheckBoxesMode = 'always';

                _.$scope.dataGridOptions.onKeyDown = function (e) {

                    //console.log('on key down',e);

                    if (e.jQueryEvent.keyCode !== 13) return;

                    if (_.$scope.OnLookUpListViewItemSelected != undefined) {

                        var SelectedRows = e.component.getSelectedRowsData();

                        if (SelectedRows.length == 0) return;

                        _.$timeout(function () {

                            _.$scope.OnLookUpListViewItemSelected(SelectedRows);

                        });
                    }


                }

            }
        }

        $scope.ClearFilter = function () {
            _.dxSearchBox.option('value', '');
            _.IsGridRefresh = false;
            if (_.Grid.FilterListControl !== undefined && _.Grid.FilterListControl !== null) {
                $.each(_.Grid.FilterListControl, function (i, f) {
                    f.Clear();
                });
            }
            _.Grid.clearFilter();
            _.IsGridRefresh = true;
            _.Grid.refresh();
        }

        if ( _.ModelHelper != null ) { 
            _.ModelHelper.Init(this);
            _.ModelHelper.onInitListView(this);
        }

        if (_.ViewHelper != null) {
            _.ViewHelper.Init(this);
            _.ViewHelper.onInitListView(this);
        }
    }

    BaseListViewController.prototype.onCustomizeColumns = function (Columns) { }

    BaseListViewController.prototype.onContextMenuPreparing = function (e) { }

    BaseListViewController.prototype.OnFilterValueChanged = function (e) {

    };

    BaseListViewController.prototype.OpenDetailView = function (options) {
        //alert('xxx');
        var CurrentObject = options.data;
        _._OpenDetailView(CurrentObject.ID, CurrentObject);

    }

    return BaseListViewController;
});