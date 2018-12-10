var jdxDataGrid = DevExpress.ui.dxDataGrid.inherit({
    _init: function (evt) {
        this.callBase();
        this._$element.addClass('dx-datagrid');
        this._$element.addClass('noselect');
    },
    _initOptions: function (o) {
        this.callBase(o);
    }
});
DevExpress.registerComponent("jdxDataGrid", jdxDataGrid);