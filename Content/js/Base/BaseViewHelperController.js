define(function () {
   "use strict"
    function baseModelHelper() {
        return (this);
    };

    baseModelHelper.prototype = {
        Init: function (VC) {
            this.VC = VC;
            this.CurrentObject = VC.$scope.CurrentObject;
        },
        onLoad: function () {
            
        },
        onCurrentObjectChanged: function (e) {
           
        },
        onCurrentObjectSaved: function (e) {

        },
        isColumnGridEditable: function (p, e) {
            return true;
        },
        onInitListView: function () { },
        onInitDetailView: function () { },
        rndID : function() {
            var min = 1000;
            var max = 9999;
            return ( Math.floor(Math.random() * (max - min + 1)) + min ) * -1;
        },
        getCurrentObject: function () {
            var _ = this;
            var VC = this.VC;
            var SelectedItems = (_.ID_ViewType == 1 ? VC.Grid.getSelectedRowsData() : [VC.$scope.CurrentObject]);
            if (SelectedItems.length !== 1) return true;
            return SelectedItems[0];
        }
    };

    return baseModelHelper;
});