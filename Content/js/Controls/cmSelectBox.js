var cmSelectBox = DevExpress.ui.dxSelectBox.inherit({
    _init: function () {
        this.callBase();
        //console.log("cmSelectBox", this);
    },
    _createDropDownButton: function () {
        try {
            //console.log(this);
            //console.log('SelectBox',this);
            return this.callBase();
        } catch (ex) {

        }
    },
    //_displayValue: function () {
    //    var value = this.callBase();
    //    if (!!value) {
    //        value = value.toUpperCase();
    //    }
    //    return value;
    //}
});
DevExpress.registerComponent("cmSelectBox", cmSelectBox);