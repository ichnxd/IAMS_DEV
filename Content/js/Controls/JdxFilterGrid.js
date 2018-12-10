//
//
//
//
var CustomDataGrid = DevExpress.ui.dxDataGrid.inherit({
    _init: function () {
        this.callBase();
        this.option("headerFilter.visible", false);
        this.option("filterRow.visible", true);
        //this.option("filterRow.applyFilter", 'onClick');
        var c = this.getView("ColumnHeadersView");
        this._$element.addClass('js-filter-grid');
        var _ = this;
        _.FilterListData = {};
        _.FilterListControl = [];
        _.ClearListViewFilter = function () {
            $.each(_.FilterListControl, function (i, cl) {
                cl.Clear();
            });
        }
        _.$q = angular.element(document).injector().get('$q');
        _.$timeout = angular.element(document).injector().get('$timeout');

        this.option("loadPanel.enabled", false);

        this.option("customizeColumns", function (columns) {
            $.each(columns, function (i, c) {
                c.allowSorting = false;
            });
        });

        var PopupView = angular.element(document).injector().get('JsPopUpView');

        this.option("onContextMenuPreparing", function (e) {
            if (e.items == null) e.items = [];
            if (e.target == "header") {
                e.items.push({
                    text: 'Edit [' + e.column.dataField + ']',
                    icon: 'mdi mdi-filter-variant',
                    onItemClick: function () {

                        
                        PopupView.OpenDetailView(4158,{
                            ID_CurrentObject : e.column.ID_ReportParameter,
                            fullScreen: false
                        });

                    }
                });

                e.items.push({
                    text: 'Add Filter Parameter',
                    icon: 'mdi mdi-playlist-plus',
                    onItemClick: function () {

                        PopupView.OpenDetailView(4158, {
                            ID_CurrentObject: -1,
                            fullScreen: false,
                            params: {
                                ID_Parent: e.column.ID_Parent
                            }
                        });

                    }
                });

                e.items.push({
                    text: 'Edit Report',
                    icon: 'mdi mdi-file-hidden',
                    onItemClick: function () {

                        PopupView.OpenDetailView(4156, {
                            ID_CurrentObject:e.column.ID_Parent,
                            fullScreen: true,
                        });

                    }
                });

                
            }
        });
        
        this.option("onCellPrepared", function (e) {
            if (e.rowType === 'filter') {
                //if (e.column['index'] > 0) {
                    
                if (e.column.SQL !== undefined) {

                    e.cellElement.html(
                        $('<div/>').dxListViewBox(
                            {
                                SQL: e.column.SQL,
                                placeholder: 'Find ' + e.column.caption + '...',
                                IsMultiSelect: true,
                                onInitialized: function (e) {
                                    _.FilterListControl.push(e.component);
                                },
                                OnItemSelected: function (values) {
                                    if (values != null) {
                                        if (values.length > 0) {
                                            _.FilterListData[e.column.dataField] = Enumerable.From(values).Select('$.ID').ToArray();
                                            return;
                                        }
                                    }
                                    _.FilterListData[e.column.dataField] = null;
                                }
                            }
                        )
                    );
                    e.cellElement.prepend('<div class="js-caption">' + e.column.caption + '</div>');
                } else {
                    e.cellElement.prepend('<div class="js-caption">' + e.column.caption + '</div>');
                }

                //}
            }
        });
    },
});
DevExpress.registerComponent("jsDataGrid", CustomDataGrid);