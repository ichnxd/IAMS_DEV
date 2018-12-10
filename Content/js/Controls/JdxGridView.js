function getRandomInt() {
    var min = 1000, max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var JdxGridView = DevExpress.ui.dxTextArea.inherit({
    _init: function () {
        var _ = this;
        _.callBase();
        _.JSDataService = angular.element(document).injector().get('JSDataService');
        _.$q = angular.element(document).injector().get('$q');
    },
    _render: function () {
        var _ = this;
        _.IsExport = false;
        _.RecordCount = 0;
        var CurrentState = undefined;
        var SQL = _.option('SQL');
        this._$element.addClass("jdx-gridview");
        this._$element.css({ 'width': '100%' });
        this._$element.parent().css({ 'width': '100%' });
        var ID_View = _.option('ID_View');
        var _width = this._$element.width();
        var _Columns = null;
        
        _.JSDataService.loadViewState(ID_View).then(function (state) {


            var summary = {
                totalItems: [{
                    name: "SelectedRowsSummary",
                    showInColumn: state.Columns !== null ? state.Columns[0].dataField : (_Columns !== null ? _Columns[0].dataField : undefined),
                    summaryType: "custom",
                    customizeText: function () {
                        return _.RecordCount + " Record" + (_.RecordCount > 1 ? "s" : "") + " found";
                    }
                }]
            };
            var summaryColumns = Enumerable.From(state.Columns).Where('$.IsSummary === true').ToArray();
            if (summaryColumns.length > 0) {
                $.each(summaryColumns, function (i, d) {
                    summary.totalItems.push({
                        name: "SelectedRowsSummary",
                        showInColumn: d.dataField,
                        summaryType: "custom",
                        customizeText: function () {
                            var value =  _[ '$' + d.dataField];
                            return value == undefined || value == null ? '0.00' : Globalize.format(_[ '$' + d.dataField],'n2');
                        }
                    });
                });
            }
            
            //style="width:' + (_width - 20) + 'px" 
            $('<div style="width:' + (_width - 20) + 'px" tabindex="1000"></div>').dxDataGrid({
                dataSource: {
                    columns: state.Columns,// _.option("Columns"),
                    load: function (loadOptions) {
                        var deferred = _.$q.defer();
                        var ListViewFilterString = null;
                        if (loadOptions.filter != undefined) {
                            ListViewFilterString = "(" + _.GetFilterString(loadOptions.filter) + ")";
                        }

                        var onLoad = _.option("onLoad");

                        var SortingExpr = null;

                        if (loadOptions.sort !== undefined && loadOptions.sort !== null) {
                            $.each(loadOptions.sort, function (i, o) {
                                SortingExpr = o.selector + " " + (o.desc === true ? "DESC" : "");
                            });
                        }

                        var summaryColumns = Enumerable.From(state.Columns).Where('$.IsSummary === true').ToArray();
                        var summaries = [];
                        if (summaryColumns.length > 0) {
                            //summaries = [];
                            $.each(summaryColumns, function (i, c) {
                                summaries.push({
                                    name: c.dataField,
                                    operator: 'SUM(' + c.dataField + ')'
                                });
                            });
                        }

                        var data = {
                            FilterString: ListViewFilterString,
                            pageSize: 20,
                            SortingExpr: SortingExpr,
                            skip: loadOptions.skip == undefined ? 0 : loadOptions.skip,
                            showProgress: false,
                            DataSource: SQL,
                            IsExport: _.IsExport,
                            SummaryColumns: JSON.stringify(summaries)
                        };

                        if (onLoad !== undefined) {
                            onLoad(data);
                        }

                        //console.log(data);
                        //_.JSDataService.GetDataSet('ListView/GetDataSet', data).then(function (Data) {

                        //    _.$timeout(function () {

                        //        if (Data.summaries != null) {

                        //            _.TotalRecordCount = Data.summaries.RecordCount;

                        //            $.each(SummaryColumns, function (i, s) {
                        //                _.$Summary[s.name] = Data.summaries[s.name];
                        //            });

                        //        }

                        //        if (IsExport == true) IsExport = false;

                        //        deferred.resolve(Data.collection);

                        //    }, 100)

                        //}, function () {
                        //    deferred.reject(null);
                        //});



                        _.JSDataService.Query(SQL, data, loadOptions.skip == undefined ? 0 : loadOptions.skip).then(function (Data) {
                            if (Data.summaries !== null) {
                                _.RecordCount = Data.summaries.RecordCount;
                                var summaryColumns = Enumerable.From(state.Columns).Where('$.IsSummary === true').ToArray();
                                if (summaryColumns.length > 0) {
                                    $.each(summaryColumns, function (i, c) {
                                        _['$' + c.dataField] = Data.summaries[c.dataField];
                                    });
                                }
                            }
                            deferred.resolve(Data.collection);
                            if (_.IsExport == true) _.IsExport = false;
                            //console.log(Data);
                        }, function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    totalCount: function () {
                        return 0;
                    }
                },
                customizeColumns: function (columns) {
                    _Columns = columns;
                    
                    var _customizeItem = function (e) {
                        if (e.value != null) {
                            if (typeof e.value == 'number') {
                                return Globalize.format(e.value, "n2")
                            }
                        }
                        return e.valueText;

                    };


                    var GroupTemplate = function (cellElement, d) {
                        cellElement.html(d.value);
                    };
                    
                    $.each(columns, function (i, o) {
                        var CurrentColumns = Enumerable.From(state.Columns).Where('$.dataField === "' + o.dataField + '"').ToArray();
                        if (CurrentColumns.length > 0) {
                            o.width = CurrentColumns[0].width;
                            o.visibleIndex = CurrentColumns[0].visibleIndex;
                            //console.log('CurrentColumn', CurrentColumns[0]);
                            o.fixed = CurrentColumns[0].fixed;
                            o.fixedPosition = CurrentColumns[0].fixedPosition;
                            //console.log(o.width);
                        } else {
                            if (o.width >= 0 && o.width <= 100) {
                                o.width = o.width + 30;
                            } else {
                                o.width = 150;
                            }
                        }
                        o.groupCellTemplate = GroupTemplate;

                        //if ($rootScope.CurrentUser.IsDeveloperMode !== true) {
                        //    if (o.dataField === "ID") {
                        //        o.visible = false;
                        //    }
                        //} else {
                        //    if (o.dataField === "ID") {
                        //        o.width = 50;
                        //    }
                        //}
                        if (o.dataField === "ID") {
                            o.visible = false;
                        }
                        //console.log(o);
                        o.showWhenGrouped = false;
                        o.allowFixing = true;
                        if (o.dataField !== "ID") {
                            o.customizeText = _customizeItem;
                        }
                        if (o.dataField.indexOf("ID_") == 0) {
                            o.visible = false;
                        }

                       

                        //if (CurrentState !== undefined && CurrentState !== null) {
                        //    var ColumnState = Enumerable.From(CurrentState.columns).Where("$.dataField == '" + o.dataField + "'").SingleOrDefault();
                        //    if (ColumnState !== null && ColumnState !== undefined) {
                        //        if (!!ColumnState.caption) {
                        //            o.caption = ColumnState.caption;
                        //        }
                        //    }
                        //}

                    });
                },
                loadPanel: {
                    enabled: false
                },
                height: function() {
                    return _.option("height");
                },
                scrolling: {
                    mode: "infinite",
                    useNative: true
                },
                filterRow: {
                    visible: false,
                    applyFilter: "onClick"
                },
                onEditorPreparing: function (e) {
                    if (e.parentType == 'filterRow') {
                        e.editorOptions.onEnterKey = function (arg) {
                            e.element.find('.dx-apply-button').trigger('dxclick');
                        }
                    }
                },
                columnResizingMode: 'widget',
                rowAlternationEnabled: true,
                allowColumnReordering: true,
                allowColumnResizing: true,
                remoteOperations: {
                    filtering: true,
                    paging: true,
                    summary: true,
                    sorting: true
                },
                onRowClick: function (e) {

                    var component = e.component;

                    if (!component.clickCount)
                        component.clickCount = 1;
                    else
                        component.clickCount = component.clickCount + 1;


                    if (component.clickCount == 1) {
                        component.lastClickTime = new Date();

                        setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
                    }
                    else if (component.clickCount == 2) {
                        if (((new Date()) - component.lastClickTime) < 300) {

                            var onRowClick = _.option('onRowClick');
                            if (onRowClick !== undefined) {
                                onRowClick(e);
                            }
                        }
                        component.clickCount = 0;
                        component.lastClickTime = 0;
                    }

                },
                onInitialized: function (e) {

                    //if (CurrentState != undefined) {
                    //    e.component.state(CurrentState);
                    //}

                    e.component.option('groupPanel.visible', false);
                    //
                    //
                    //

                    var OnGridInit = _.option("OnGridInit");

                    if (OnGridInit !== undefined) {
                        OnGridInit(e.component);
                    }

                    var onGridViewInitialized = _.option("onGridViewInitialized");
                    if (onGridViewInitialized !== undefined) {
                        onGridViewInitialized(e.component);
                    }
                },
                "export": {
                    fileName: moment(new Date()).format('MMDDYYYYHHmm')
                },
                paging: {
                    pageSize: 20,
                    enabled: true,
                },
                groupPanel: {
                    visible:true
                },
                hoverStateEnabled: true,
                showBorders: true,
                allowColumnReordering: true,
                wordWrapEnabled: false,
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'never'
                },
                summary: summary,
                onKeyDown: function (e) {
                    if (e.jQueryEvent.keyCode === 13) {
                        var onEnterKey = _.option("onEnterKey");
                        if (onEnterKey !== null && onEnterKey !== undefined) {
                            onEnterKey(e);
                        }
                    }
                    
                    if (e.jQueryEvent.keyCode == 27) {
                        var Grid = e.component;
                        Grid.clearSelection();
                    }
                }, onContextMenuPreparing: function (e) {
                    if (e.items == undefined) e.items = [];
                    if (e.row !== undefined) {
                        if (e.row.rowType == 'header') {

                            e.items.push({
                                text: 'Group Header',
                                onItemClick: function () {
                                    var Value = e.component.option('groupPanel.visible');
                                    e.component.option('groupPanel.visible', !Value);
                                }
                            });

                            e.items.push({
                                text: 'Column Chooser',
                                onItemClick: function () {
                                    e.component.showColumnChooser();
                                }
                            });


                            if (ID_View !== undefined) {
                                e.items.push({
                                    text: 'Add/Edit Columns',
                                    icon: 'mdi mdi-view-list',
                                    onItemClick: function () {

                                        var $rootScope = angular.element(document).injector().get('$rootScope');

                                        $rootScope.$emit("CallNewTabMethod", {

                                            ID: getRandomInt(),
                                            Caption: 'SQL VIEW',
                                            ID_ViewType: 5,
                                            ViewID: 3350,
                                            params: {
                                                ID_ViewType: 3,
                                                ID_View: state.ID
                                            }
                                        });

                                    }
                                });


                                e.items.push({
                                    text: 'Save Layout',
                                    icon: 'mdi mdi-content-save',
                                    onItemClick: function () {

                                        //ID_View = ID_View.replace("-", "");

                                        var State = e.component.state();
                                        State.selectedRowKeys = [];

                                        var ColumnStates = [];

                                        $.each(_Columns, function (i, c) {
                                            var Column = Enumerable.From(State.columns).Where("$.dataField == '" + c.dataField + "'").SingleOrDefault();
                                            Column.caption = c.caption;
                                            ColumnStates.push(Column);
                                        });

                                        State.columns = ColumnStates;

                                        console.log(State.columns);

                                        _.JSDataService.Post('/JsApp/SaveViewGridLookupState', {
                                            formatKey: ID_View,
                                            //ID: Options.ID_Control,
                                            //formatKey : Options.formatKey,
                                            format: JSON.stringify(State)
                                        }).then(function (response) {
                                            DevExpress.ui.notify('Layout Save.', 'success', 1000);
                                        });

                                    }
                                });
                            }
                        }
                    }
                    e.items.push({
                        text: 'Refresh',
                        icon: 'mdi mdi-refresh',
                        onItemClick: function () {
                            e.component.refresh();
                        }
                    });

                    e.items.push({
                        text: 'Show/Hide Filter',
                        icon: 'mdi mdi-filter',
                        onItemClick: function () {
                            var IsFilterRowVisible = e.component.option('filterRow.visible');
                            e.component.option('filterRow.visible', !IsFilterRowVisible);
                        }
                    });

                    e.items.push({
                        text: "Export to xls",
                        icon: "fa fa-file-excel-o",
                        onItemClick: function () {
                            _.IsExport = true;
                            e.component.exportToExcel(false);
                        }
                    });

                    if (e.row !== undefined) {
                        if (e.row.rowType == 'data') {

                            var onContextMenuPreparing = _.option("onContextMenuPreparing");
                            if (onContextMenuPreparing != undefined) {
                                var Grid = e.component;
                                Grid.deselectAll();
                                var itemsSelected = Grid.getSelectedRowsData();
                                if (itemsSelected.length < 2) {
                                    Grid.selectRowsByIndexes([e.rowIndex]);
                                }
                                onContextMenuPreparing(e);
                            }
                        }
                    }
                }
            }).appendTo(_._$element).keydown(function (evt) {
                if (evt.which == 13) {
                    var onEnterKey = _.option("onEnterKey");
                    if (onEnterKey !== null && onEnterKey !== undefined) {
                        onEnterKey({
                            jQueryEvent : evt
                        });
                    }
                }
            });
        });
    }
    , _renderDisplayText: function (value) { }
    , GetFilterString  : function (filterArray) {
        var filterString = '';
        $.each(filterArray, function (i, o) {
            if ($.isArray(o)) {
                filterString += " (" + this.GetFilterString(o) + ") "
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
                            value = "2";
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
});
DevExpress.registerComponent("jdxGridView",JdxGridView);