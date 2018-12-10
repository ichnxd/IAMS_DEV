var jDxImport = DevExpress.ui.dxTextArea.inherit({
    _init: function () {
        this.callBase();
    },
    _render: function () {
        var _ = this;

        $('<div></div>').dxFileUploader({
            selectButtonText: "Import",
            labelText: "",
            accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
            onValueChanged: function (e) {

                _.option('OnValueChanged')(e);
            
            },
            //onInitialized: function () {
            //    console.log(_);
               
            //},
            uploadMode: "useForm"
        }).appendTo(this._$element);
    },
    _renderDisplayText: function (value) {
      
       
    }
});
DevExpress.registerComponent("jDxImport",jDxImport);